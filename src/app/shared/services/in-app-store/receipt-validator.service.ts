import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const productionHost = 'buy.itunes.apple.com';
const sandboxHost = 'sandbox.itunes.apple.com';

const statusCodes = {
  [0]: { message: 'Active', valid: true, error: false },
  [21000]: { message: 'App store could not read', valid: false, error: true },
  [21002]: { message: 'Data was malformed', valid: false, error: true },
  [21003]: { message: 'Receipt not authenticated', valid: false, error: true },
  [21004]: { message: 'Shared secret does not match', valid: false, error: true },
  [21005]: { message: 'Receipt server unavailable', valid: false, error: true },
  [21006]: { message: 'Receipt valid but sub expired', valid: true, error: false },
  /**
   * special case for app review handling - forward any request that is intended for the Sandbox but was sent to
   * Production, this is what the app review team does
   */
  [21007]: { message: 'Sandbox receipt sent to Production environment', valid: false, error: true, redirect: true },
  [21008]: { message: 'Production receipt sent to Sandbox environment', valid: false, error: true },
};

function VerificationError(error) {
  ['message', 'valid', 'error', 'redirect'].map(prop => this[prop] = error[prop]);
}

VerificationError.prototype = Object.create(Error.prototype);

@Injectable({
  providedIn: 'root',
})
export class ReceiptValidatorService {
  static BACK_URL = 'https://fretboard-learning.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  verifyReceipt(receipt: string, uuid: string) {
    return combineLatest([
      this.httpClient.post<{ valid: boolean }>(`${ ReceiptValidatorService.BACK_URL }/verifyReceipt`,
        { receipt, prod: true, uuid }),
      this.httpClient.post<{ valid: boolean }>(`${ ReceiptValidatorService.BACK_URL }/verifyReceipt`,
        { receipt, prod: false, uuid }),
    ]).pipe(
      map(([ob1, ob2]) => ob1.valid || ob2.valid),
      tap(returned => console.log({ returned })),
    );
  }
}
