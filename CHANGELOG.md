# Strike by Appiphony

### Release 0.8.0 — July 28, 2017
#### New Features
* **Strike Carousel:** A paginated list of items that scroll left and right
* **Strike Output Text:** An element designed to output various types of data as text
#### Improvements
* **All Strike Components:** Updated API versions to 40
#### Bug Fixes
* **Strike Lookup:** Fixed an issue where IE and Edge browsers were incorrectly displaying scrollbars around the component's container <a href="https://github.com/appiphony/Strike-Components/issues/42" target="_blank">[GitHub Issue #42]</a>

---

### Release 0.7.0 — July 14, 2017
#### New Features
* **Strike Radio Group:** A form element for accepting a single selection based on descriptive options
#### Improvements
* **All Strike Components:** Added version numbers and the BSD 2-Clause License to all `*.cmp` and `*.cls` files <a href="https://github.com/appiphony/Strike-Components/issues/29" target="_blank">[GitHub Issue #29]</a>
* **Strike Datepicker:** Added the `yearsBefore` and `yearsAfter` attributes to limit the year select options <a href="https://github.com/appiphony/Strike-Components/issues/3" target="_blank">[GitHub Issue #3]</a>
* **Strike Datepicker:** Added the `helpTextPlacement` attribute to enable custom `helpText` popover positioning <a href="https://github.com/appiphony/Strike-Components/issues/20" target="_blank">[GitHub Issue #20]</a>
* **Strike Input:** Added the `helpTextPlacement` attribute to enable custom `helpText` popover positioning <a href="https://github.com/appiphony/Strike-Components/issues/20" target="_blank">[GitHub Issue #20]</a>
* **Strike Lookup:** Added the `helpTextPlacement` attribute to enable custom `helpText` popover positioning <a href="https://github.com/appiphony/Strike-Components/issues/20" target="_blank">[GitHub Issue #20]</a>
* **Strike Modal:** Added the `size` attribute to enable large modals <a href="https://github.com/appiphony/Strike-Components/pull/35" target="_blank">[GitHub Pull Request #35]</a>&nbsp;<a href="https://github.com/mbowen000" target="_blank">[Credit: mbowen000]</a>
* **Strike Multi Lookup:** Added the `helpTextPlacement` attribute to enable custom `helpText` popover positioning <a href="https://github.com/appiphony/Strike-Components/issues/20" target="_blank">[GitHub Issue #20]</a>
* **Strike Multi Select Picklist:** Added the `helpTextPlacement` attribute to enable custom `helpText` popover positioning <a href="https://github.com/appiphony/Strike-Components/issues/20" target="_blank">[GitHub Issue #20]</a>
* **Strike Multi Select Picklist:** Added the `externalValueChange` Aura method to enable rerendering of selection pills based on the `value` attribute <a href="https://github.com/appiphony/Strike-Components/issues/33" target="_blank">[GitHub Issue #33]</a>
* **Strike Popover:** Added support for the `'auto '` prefix on all `placement` values <a href="https://github.com/appiphony/Strike-Components/pull/27" target="_blank">[GitHub Pull Request #27]</a>&nbsp;<a href="https://github.com/dsharrison" target="_blank">[Credit: dsharrison]</a>
* **Strike Select:** Added the `helpTextPlacement` attribute to enable custom `helpText` popover positioning <a href="https://github.com/appiphony/Strike-Components/issues/20" target="_blank">[GitHub Issue #20]</a>
* **Strike Textarea:** Added the `helpTextPlacement` attribute to enable custom `helpText` popover positioning <a href="https://github.com/appiphony/Strike-Components/issues/20" target="_blank">[GitHub Issue #20]</a>
* **Strike Tooltip:** Added support for the `'auto '` prefix on all `placement` values <a href="https://github.com/appiphony/Strike-Components/pull/27" target="_blank">[GitHub Pull Request #27]</a>&nbsp;<a href="https://github.com/dsharrison" target="_blank">[Credit: dsharrison]</a>
#### Bug Fixes
* **Strike Chart:** Fixed an issue where pie charts were being cut off with certain legend text lengths <a href="https://github.com/appiphony/Strike-Components/issues/32" target="_blank">[GitHub Issue #32]</a>
* **Strike Data Grid:** Fixed an issue where responsive mobile headers were displaying incorrect values <a href="https://github.com/appiphony/Strike-Components/issues/30" target="_blank">[GitHub Issue #30]</a>
* **Strike Input:** Fixed a typo where the `tabindex` attribute was incorrectly camel-cased <a href="https://github.com/appiphony/Strike-Components/issues/37" target="_blank">[GitHub Issue #37]</a>
* **Strike Input:** Fixed an issue where `tabindex` was not being applied to toggles
* **Strike Multi Select Picklist:** Fixed an issue where pre-populated selection would appear twice on load <a href="https://github.com/appiphony/Strike-Components/issues/15" target="_blank">[GitHub Issue #15]</a>
* **Strike Multi Select Picklist:** Fixed an issue where the component was causing a warning with Locker Service enabled <a href="https://github.com/appiphony/Strike-Components/issues/25" target="_blank">[GitHub Issue #25]</a>

---

### Release 0.5.0 — April 21, 2017
#### Improvements
* **Strike Pill:** Renamed the `type` attribute to `variant`
* **Strike Tile:** Renamed the `source` attribute to `avatarSource`
#### Bug Fixes
* **Strike Input:** Fixed an issue where the types `datetime-local` and `month` were incorrectly styled on mobile devices
* **Strike Pill:** Fixed an issue where clicking SVG icons would not propagate click events in Microsoft Edge
* **Strike Textarea:** Fixed an issue where assigning a negative value to `maxlength` would cause the component to break
* **Strike Tile:** Fixed an issue where clicking SVG icons would not propagate click events in Microsoft Edge

---

### Release 0.6.0 — May 5, 2017
#### New Features
* **Strike Data Grid:** A sortable and responsive data table component which accepts JSON data
* **Strike Wizard:** A process component used to communicate the progress of a particular process to the user
#### Improvements
* **Strike Input:** Added the `onkeydown` and `onkeyup` attributes
* **Strike Textarea:** Added the `onchange`, `onfocus`, `onblur`, `oninput`, `onkeydown`, and `onkeyup` attributes
#### Bug Fixes
* **Strike Input:** Fixed an issue where the `oninput` attribute would not call the specified controller method in certain cases

---

### Release 0.5.0 — April 21, 2017
#### Improvements
* **Strike Pill:** Renamed the `type` attribute to `variant`
* **Strike Tile:** Renamed the `source` attribute to `avatarSource`
#### Bug Fixes
* **Strike Input:** Fixed an issue where the types `datetime-local` and `month` were incorrectly styled on mobile devices
* **Strike Pill:** Fixed an issue where clicking SVG icons would not propagate click events in Microsoft Edge
* **Strike Textarea:** Fixed an issue where assigning a negative value to `maxlength` would cause the component to break
* **Strike Tile:** Fixed an issue where clicking SVG icons would not propagate click events in Microsoft Edge

---

### Release 0.4.0 — April 18, 2017

#### New Features
* **Strike Multi Lookup:** Similar to Strike Multi Select Picklist, Strike Multi Lookup gives the user the ability to select multiple Salesforce records in one field
* **Strike Popover:** Similar to Strike Tooltip, a Strike Popover appears when a user hovers over its trigger element and can display markup/components in its body
* **Strike Tile:** A grouping of information that can be used to describe a record (fiddler and documentation coming soon; used in Strike Multi Lookup)
#### Improvements
* **Strike Datepicker:** Datepickers now use the system's datepicker on mobile devices <a href="https://github.com/appiphony/Strike-Components/issues/14" target="_blank">[GitHub Issue #14]</a>
* **Strike Input:** Added support for the `checkbox`, `radio`, and `toggle` types
* **Strike Input:** Added the `showError(errorMessage)` and `hideError()` methods
* **Strike Multi Select Picklist:** Added the `onchange` attribute that calls a controller method when a selection is added or removed
* **Strike Multi Select Picklist:** A "no results" message has been added
* **Strike Option:** Renamed the `strike_filterBy()` and `strike_optionSelected()` methods to `filterBy()` and `select()` respectively
* **Strike Option Group:** Renamed the `strike_filterBy()` method to `filterBy()`
* **Strike Select:** Strike Option Groups no longer display when `searchable` is set to `true` and no results in that group are found
* **Strike Select:** A "no results" message has been added when searchable is set to true
* **Strike Textarea:** Added the `blur()`, `focus()`, `select()`, `showError(errorMessage)`, and `hideError()` methods
#### Bug Fixes
* **Strike Datepicker:** Fixed an issue where datepickers were unintentionally closing when clicking the Today link, left/right month arrows, and year select <a href="https://github.com/appiphony/Strike-Components/issues/9" target="_blank">[GitHub Issue #9]</a>
* **Strike Multi Select Picklist:** Fixed an issue where options were not filterable on mobile devices, though the input was still in focus behind the overlay <a href="https://github.com/appiphony/Strike-Components/issues/10" target="_blank">[GitHub Issue #10]</a>
* **Strike Multi Select Picklist:** Fixed an issue where multiple selections could not be made on iOS <a href="https://github.com/appiphony/Strike-Components/issues/11" target="_blank">[GitHub Issue #11]</a>
* **Strike Multi Select Picklist:** Fixed an issue where options were not reset after closing the picklist immediately after a search that yielded no results <a href="https://github.com/appiphony/Strike-Components/issues/13" target="_blank">[GitHub Issue #13]</a>
* **Strike Select:** Fixed an issue where clicking/tapping on the search input (when `searchable` is set to `true`) closes the dropdown
* **Strike Select:** Fixed an issue where searches also returned option groups and sometimes displayed incorrect results

---

### Release 0.3.0 — March 31, 2017

#### Improvements
* **Strike Lookup:** Added new dropdown menu styles for mobile devices
* **Strike Lookup:** Events have been modified to utilize a single event bundle in order to minimize component dependencies (see documentation for updated `name` and `type` values)
* **Strike Modal:** Events have been modified to utilize a single event bundle in order to minimize component dependencies (see documentation for updated `name` and `type` values)
* **Strike Multi Select Picklist:** Added new dropdown menu styles for mobile devices
* **Strike Multi Select Picklist:** Events have been modified to utilize a single event bundle in order to minimize component dependencies (see documentation for updated `name` and `type` values)
* **Strike Select:** Added new dropdown menu styles for mobile devices
* **Strike Select:** Events have been modified to utilize a single event bundle in order to minimize component dependencies (see documentation for updated `name` and `type` values)
* **Strike Tooltip:** Tooltips that extend past the left or right window bounds when `placement` is set to `top` or `bottom` now have their positioning adjusted to be fully visible in the window
#### Bug Fixes
* **Strike Select:** Fixed an issue where users were unable to open the select's dropdown when `searchable` is set to `true`
* **Strike Lookup:** Fixed an issue where the `showRecentRecords` attribute was unable to retrieve recent records in the org
* **Strike Lookup:** Fixed an issue where the search icon was incorrectly placed when viewed on mobile devices
* **Strike Lookup:** Fixed an issue where an empty dropdown menu would sometimes appear over the "Searching..." message

---

### Release 0.2.0 — March 21, 2017

#### New Features
* **Strike Input (Beta):** Similar to `lightning:input`, Strike Input comes with support for `helpText` functionality and custom error handling (fiddler and documentation coming soon)
* **Strike Pill (Beta):** Formerly part of Strike Multi Select Picklist, Strike Pill has been abstracted so it can be used in other upcoming Components (fiddler and documentation coming soon)
#### Improvements
* **Strike Datepicker:** Added the `helpText` attribute for descriptive tooltips (appears after the form label)
* **Strike Lookup:** Added the `helpText` attribute for descriptive tooltips (appears after the form label)
* **Strike Lookup:** Added the `class` attribute for applying custom classes to the lookup's outer element
* **Strike Lookup:** Added the `searchingMessage` attribute for editing the message that appears in the dropdown when a search is being performed
* **Strike Lookup:** Added the `noResultsMessage` attribute for editing the message that appears in the dropdown when no results are found
* **Strike Multi Select Picklist:** Added the `helpText` attribute for descriptive tooltips (appears after the form label)
* **Strike Multi Select Picklist:** Added max-height to the dropdown's list
* **Strike Select:** Added the `helpText` attribute for descriptive tooltips (appears after the form label)
* **Strike Select:** Added support for HTML forms
* **Strike SVG:** Changed `svg` component bundle to `strike_svg`
* **Strike Textarea:** Added the `helpText` attribute for descriptive tooltips (appears after the form label)
#### Bug Fixes
* **Strike Datepicker:** Fixed an issue where the menu opens when tabbing into the input
* **Strike Datepicker:** Fixed an issue where clicking the SVG portion of the datepicker's button did not open the menu in Microsoft Edge <a href="https://github.com/appiphony/Strike-Components/issues/5" target="_blank">[GitHub Issue #5]</a>
* **Strike Lookup**: Fixed an issue where records were still selected after closing the menu without confirming a selection <a href="https://github.com/appiphony/Strike-Components/issues/2" target="_blank">[GitHub Issue #2]</a>
* **Strike Lookup**: Fixed an issue where the menu doesn't close when tabbing out of the input <a href="https://github.com/appiphony/Strike-Components/issues/4" target="_blank">[GitHub Issue #4]</a>
* **Strike Lookup**: Fixed an issue where the input's search icon was incorrectly positioned
* **Strike Lookup**: Removed `debugger` line <a href="https://github.com/appiphony/Strike-Components/issues/6" target="_blank">[GitHub Issue #6]</a>
* **Strike Multi Select Picklist**: Fixed an issue where the input's search icon was incorrectly positioned
* **Strike Multi Select Picklist**: Fixed an issue where selected pills did not have spacing between them
* **Strike Select:** Fixed an issue where the component was not focusable
* **Strike Select:** Fixed an issue where initialized values were not set
* **Strike Textarea:** Fixed an issue where the `value` attribute would not update when the textarea's value is updated via the contextmenu

---

### Release 0.1.1 — March 1, 2017

#### Bug Fixes
* **Lookup:** Fixed an issue where records with `null` values for the `search` and `subtitle` fields caused lookups to throw an exception <a href="https://github.com/appiphony/Strike-Components/issues/1" target="_blank">[GitHub Issue #1]</a>

---

### Release 0.1.0 — February 24, 2017
* Initial release
* Open sourced: <a href="https://github.com/appiphony/Strike-Components" target="_blank">https://github.com/appiphony/Strike-Components</a>
