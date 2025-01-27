package plan

import (
	"encoding/hex"
	"net/http"
	"net/url"
	"strconv"

	"github.com/gorilla/mux"
	hub "github.com/sentinel-official/hub/types"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/plan"
)

func HandlerGetPlan(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		result, err := ctx.Client().QueryPlan(id)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		items := plan.NewPlanFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func parseQuery(query url.Values) (skip, limit int, status hub.Status, err error) {
	skip = 0
	if query.Get("skip") != "" {
		skip, err = strconv.Atoi(query.Get("skip"))
		if err != nil {
			return 0, 0, 0, err
		}
	}

	limit = 25
	if query.Get("limit") != "" {
		limit, err = strconv.Atoi(query.Get("limit"))
		if err != nil {
			return 0, 0, 0, err
		}
	}

	status = hub.StatusActive
	if query.Get("status") != "" {
		status = hub.StatusFromString(query.Get("status"))
	}

	return skip, limit, status, nil
}

func HandlerGetPlansForProvider(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		skip, limit, status, err := parseQuery(r.URL.Query())
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		vars := mux.Vars(r)

		address, err := hex.DecodeString(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}

		result, err := ctx.Client().QueryPlansForProvider(address, status, skip, limit)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		items := plan.NewPlansFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}
