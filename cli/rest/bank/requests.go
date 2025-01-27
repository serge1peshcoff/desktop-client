package bank

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type RequestSend struct {
	Memo     string `json:"memo"`
	Password string `json:"password"`

	To     string      `json:"to"`
	Amount other.Coins `json:"amount"`
}

func NewRequestSend(r *http.Request) (*RequestSend, error) {
	var body RequestSend
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestSend) Validate() error {
	if r.Password == "" {
		return fmt.Errorf("invalid field Password")
	}
	if r.To == "" {
		return fmt.Errorf("invalid field To")
	}
	if len(r.Amount) == 0 {
		return fmt.Errorf("invalid field Amount")
	}

	return nil
}
