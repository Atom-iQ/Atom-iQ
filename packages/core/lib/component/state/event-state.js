import { ReplaySubject, pipe, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

/**
 * Create state subject
 * eventState is returning connectEvent, as a second element - the function
 * that's connecting state and event (for certain element) - then state
 * value are computed from incoming events. One state field could be connected
 * to multiple events.
 *
 * eventState is taking an operator (that could be piped before) - it's used to compute
 * state value from events - for all connected events. Additionally connectEvent is
 * also taking an (pre-)operator, called per one concrete event, before calling operator for
 * all events - it's enabling connecting different types of events.
 *
 * @param operator
 */
const eventState = (operator) => {
    /**
     * Replay subject - as it's state, it's good (for most cases), to push last state value
     * to new observers.
     */
    const stateSubject = new ReplaySubject(1);
    const state$ = stateSubject.asObservable();
    /**
     * Connect event with state
     * Have to be passed to Reactive Event Handler props
     * @param preOperator
     */
    const connectEvent = preOperator => (event$) => {
        const source$ = operator
            ? preOperator
                ? operator(preOperator(event$))
                : operator(event$)
            : preOperator
                ? preOperator(event$)
                : event$;
        return pipe(tap(stateSubject.next), catchError(error => {
            stateSubject.next(error);
            return throwError(() => error);
        }))(source$);
    };
    return [state$, connectEvent];
};

export default eventState;