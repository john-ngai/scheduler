# Redux Implementation Logs

## Changes to the `/src` Directory

**From**: <br>
&nbsp; `/components` <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `/Appointment` <br>
&nbsp; `/styles` <br>
&nbsp; `index.js` <br>
&nbsp; `index.scss` <br>

**To**: <br>
&nbsp; `/app` <br>
&nbsp; `/components` <br>
&nbsp; `/features` <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `/appointments` <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `/days` <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `/interviewers` <br>
&nbsp; `/styles` <br>
&nbsp; `App.js` <br>
&nbsp; `App.scss` <br>
&nbsp; `index.js` <br>
&nbsp; `index.scss` <br>

## New Files Added

* `/src/app/store.js`
* `/src/features/`
  * `appointments/`
    * `AppointmentsList.js`
    * `appointmentsSlice.js`
  * `days/`
    * `daysSlice.js`
  * `interviewers/`
    * `interviewersSlice.js`

## Existing Files Renamed

* `/Appointment/index.js` to `AppointmentListItem.js`
* `/Appointment/styles.scss` to `AppointmentListItem.scss`
* `Application.js` to `App.js`
* `Application.scss` to `App.scss`

## Existing Files Removed

* `selectors.js`
* `useApplicationData.js`
* `useVisualMode.js`

## Existiing Files Editted

* `/src/index.js`
* `App.js`
* `AppointmentListItem.js`
* `DayList.js`