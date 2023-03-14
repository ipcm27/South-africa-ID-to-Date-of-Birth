import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from './alert.model';
import * as DO_NOT_REFERENCE from '../../assets/messages.json';
type MessagesType = typeof DO_NOT_REFERENCE;

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new ReplaySubject<Alert>(1);
  private keepAfterRouteChange = false;
  private messagesJson!: MessagesType;

  constructor(private router: Router, private http: HttpClient) {
    // Clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });

    // Import message.json at runtime
    this.http.get<MessagesType>('../../assets/messages.json').subscribe(
      (data) => {
        this.messagesJson = data;
      },
      (error) => {
        console.error(
          'Error occured while trying to load messages.json',
          error
        );
      }
    );
  }

  /** Enables subscribing to alerts observable */
  onAlert(alertId?: string): Observable<Alert> {
    return this.subject
      .asObservable()
      .pipe(filter((x) => x && x.alertId === alertId));
  }

  /** Creates an error alert using the preset message contained in messages.json
   * @param module The top level JSON key used to lookup the error message
   * @param key The second level JSON key used to lookup the error message
   * @param fallback Fallback message to display in case JSON lookup fails. Do not rely on this
   * to show your error! You must be loading your error from messages.json whenever possible.
   */
  presetError<M extends keyof MessagesType>(
    module: M,
    key: keyof MessagesType[M],
    fallback?: string
  ) {
    const fallbackMessage =
      fallback || 'An error has occurred, but error message lookup failed.';
    let message: string;

    try {
      let extractedMessage = this.messagesJson[module][key];

      if (typeof extractedMessage === 'string') {
        message = extractedMessage;
      } else {
        // console.error(`Unable to extract string value from key ${module}.${key} in messages.json`, extractedMessage);
        message = fallbackMessage;
      }
    } catch (e) {
      // console.error(`Error occurred while trying to extract key ${module}.${key} from messages.json`, e)
      message = fallbackMessage;
    }

    this.error(message);
  }

  // convenience methods
  success(message: string, alertId?: string) {
    this.alert(
      new Alert({
        message,
        type: AlertType.Success,
        alertId,
        keepAfterRouteChange: this.keepAfterRouteChange,
      })
    );
  }

  error(message: string, alertId?: string) {
    this.alert(
      new Alert({
        message,
        type: AlertType.Error,
        alertId,
        keepAfterRouteChange: this.keepAfterRouteChange,
      })
    );
  }

  info(message: string, alertId?: string) {
    this.alert(
      new Alert({
        message,
        type: AlertType.Info,
        alertId,
        keepAfterRouteChange: this.keepAfterRouteChange,
      })
    );
  }

  warn(message: string, alertId?: string) {
    this.alert(
      new Alert({
        message,
        type: AlertType.Warning,
        alertId,
        keepAfterRouteChange: this.keepAfterRouteChange,
      })
    );
  }

  alert(alert: Alert) {
    console.debug('Alert Registered in Service:', alert);
    this.keepAfterRouteChange = alert.keepAfterRouteChange;
    this.subject.next(alert);
  }

  // clear alerts
  clear(alertId?: string) {
    this.subject.next(new Alert({ alertId }));
  }
}
