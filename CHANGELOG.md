# Strike by Appiphony

###Release 1.0.0 — December 5, 2017
####New Features
* **Strike Path:** Replaces `Strike Wizard` this component was renamed to match the lightning component it best resembles, `lightning path`, no changes have been made to its functionality. However, the values for the `displayMode` attribue have been replaced, `wizard` is now `linear` and `simple` is now `non-linear` <a href="https://github.com/appiphony/Strike-Components/issues/157" target="_blank">[GitHub Issue #157]</a>
* **Strike Picklist:** Replaces `Strike Select` this component was renamed to match it's behavior, no changes have been made to its functionality <a href="https://github.com/appiphony/Strike-Components/issues/159" target="_blank">[GitHub Issue #159]</a>
#### Improvements
* **Multi Select Picklist:** Added the ability to make pills `undestroyable`, regardless if the Multi Select Picklist is `disabled` or not <a href="https://github.com/appiphony/Strike-Components/issues/149" target="_blank">[GitHub Issue #149]</a>
#### Bug Fixes
* **Strike Picklist (formerly Strike Select):** Fixed an issue where preselecting a disabled option via code wouldn't set the picklist value <a href="https://github.com/appiphony/Strike-Components/issues/143" target="_blank">[GitHub Issue #143]</a>
* **Strike Multi Select Picklist:** Fixed an issue where deselecting a pill was causing the page to scroll to the top <a href="https://github.com/appiphony/Strike-Components/issues/156" target="_blank">[GitHub Issue #156]</a>
* **Strike Data Grid:** Fixed an issue where `Load More` was displaying when the rows were all rendered <a href="https://github.com/appiphony/Strike-Components/issues/163" target="_blank">[GitHub Issue #163]</a>

---

###Release 0.10.1 — November 28, 2017
####Improvements
* **Strike Data Grid:** Added `loadMore` functionality to control how many rows are displayed and how many render when `loadMore` button is pressed <a href="https://github.com/appiphony/Strike-Components/issues/135" target="_blank">[GitHub Issue #135]</a>
#### Bug Fixes
* **Strike Datepicker:** Fixed an issue where clicking into a datepicker input with a value does not open the datepicker <a href="https://github.com/appiphony/Strike-Components/issues/119" target="_blank">[GitHub Issue #119]</a>
* **Strike Modal:** Closing the modal with 'Esc' key will now fire a close event <a href="https://github.com/appiphony/Strike-Components/issues/125" target="_blank">[GitHub Issue #125]</a>
* **Strike Modal:** Fixed an issue where pressing the 'Esc' key does not close a modal if it was opened through modifying the `showModal` attribute <a href="https://github.com/appiphony/Strike-Components/issues/126" target="_blank">[GitHub Issue #126]</a>
* **Strike Multi Select Picklist:** Fixed an issue where selections are removable even if the picklist is disabled <a href="https://github.com/appiphony/Strike-Components/issues/132" target="_blank">[GitHub Issue #132]</a>
* **Strike Datepicker:** Fixed issue where two datepickers on one page wouldn't close eachother when one was selected and the other was open <a href="https://github.com/appiphony/Strike-Components/issues/134" target="_blank">[GitHub Issue #134]</a>
* **Strike Chart:** Fixed issue with the chart rendering without a background <a href="https://github.com/appiphony/Strike-Components/issues/133" target="_blank">[GitHub Issue #133]</a>
* **Strike Select:** Fixed an issue where dropdowns are not opening if `searchable` is set to `true` <a href="https://github.com/appiphony/Strike-Components/issues/122" target="_blank"> [GitHub Issue #122]</a>
* **Strike Select:** Fixed an issue where the component appears in Lightning Page Builder <a href="https://github.com/appiphony/Strike-Components/issues/124" target="_blank">[GitHub Issue #124]</a>
* **Strike Input:** Fixed an issue where required validation was happening on change and not blur <a href="https://github.com/appiphony/Strike-Components/issues/145" target="_blank">[GitHub Issue #145]</a>
* **Strike Datepicker:** Fixed an issue where datepicker was rendering with a transparent background <a href="https://github.com/appiphony/Strike-Components/issues/148" target="_blank">[GitHub Issue #148]</a>
* **Strike Multi Select Picklist:** Fixed an issue where options were rendering incorrectly when in an error state <a href="https://github.com/appiphony/Strike-Components/issues/150" target="_blank">[GitHub Issue #150]</a>

---

### Release 0.10.0 — November 1, 2017
#### Improvements
* **All Strike Components:** Updated API versions to 41
* **All Strike Components:** Components now utilize `lightning:icon` in place of `strike_svg` wherever applicable <a href="https://github.com/appiphony/Strike-Components/issues/77" target="_blank">[GitHub Issue #77]</a>
* **Strike Data Grid:** Added the `sortValue` property on the object being passed in when the column's `type` is set to `'COMPONENT'`; represents the string value to be sorted on the component's behalf <a href="https://github.com/appiphony/Strike-Components/issues/67" target="_blank">[GitHub Issue #67]</a>
* **Strike Input:** Inputs with `required` set to `true` will now automatically set `error` to `true` and `errorMessage` to `'Complete this field'` when the input is empty and a change event occurs <a href="https://github.com/appiphony/Strike-Components/issues/51" target="_blank">[GitHub Issue #51]</a>
* **Strike Modal:** Added the `showCloseButton` attribute (default set to `true`) to allow control over the close button's visibility <a href="https://github.com/appiphony/Strike-Components/issues/94" target="_blank">[GitHub Issue #94]</a>
* **Strike Modal:** Removed an event listener that is no longer needed in Winter '18 <a href="https://github.com/appiphony/Strike-Components/issues/109" target="_blank">[GitHub Issue #109]</a>
* **Strike Modal:** New events have been added to expose how a modal was dismissed (`strike_evt_modalSecondaryButtonClicked` and `strike_evt_modalCloseButtonClicked`) <a href="https://github.com/appiphony/Strike-Components/issues/110" target="_blank">[GitHub Issue #110]</a>
* **Strike Select:** Removed the `placeholder` default value to match all other Strike form elements' functionality <a href="https://github.com/appiphony/Strike-Components/issues/81" target="_blank">[GitHub Issue #81]</a>
#### Bug Fixes
* **All Strike Components:** Updated use of an event property for Firefox compliance <a href="https://github.com/appiphony/Strike-Components/issues/39" target="_blank">[GitHub Issue #39]</a> <a href="https://github.com/appiphony/Strike-Components/issues/106" target="_blank">[GitHub Issue #106]</a>
* **Strike Carousel:** Updated helptext for icon name <a href="https://github.com/appiphony/Strike-Components/issues/104" target="_blank">[GitHub Issue #104]</a>
* **Strike Data Grid:** Fixed an issue where the component would throw an error if too many rows were passed in <a href="https://github.com/appiphony/Strike-Components/issues/66" target="_blank">[GitHub Issue #66]</a>
* **Strike Data Grid:** Fixed an issue where the component would throw an error if only one row object was provided <a href="https://github.com/appiphony/Strike-Components/issues/70" target="_blank">[GitHub Issue #70]</a>
* **Strike Datepicker:** Fixed an issue where the form element border is missing in Winter '18 <a href="https://github.com/appiphony/Strike-Components/issues/97" target="_blank">[GitHub Issue #97]</a><a href="https://github.com/appiphony/Strike-Components/issues/115" target="_blank">[GitHub Issue #115]</a>
* **Strike Datepicker:** Fixed an issue where the help text tooltip styling was not consistent with other Strike form elements <a href="https://github.com/appiphony/Strike-Components/issues/99" target="_blank">[GitHub Issue #99]</a>
* **Strike Icon Picker:** Fixed an issue where same icon couldn't be selected across multiple options <a href="https://github.com/appiphony/Strike-Components/issues/103" target="_blank">[GitHub Issue #103]</a>
* **Strike Icon Picker:** Fixed an issue where the form element border is missing in Winter '18 <a href="https://github.com/appiphony/Strike-Components/issues/111" target="_blank">[GitHub Issue #111]</a>
* **Strike Input:** Fixed an issue where the `disabled` attribute is incorrectly handled on Edge <a href="https://github.com/appiphony/Strike-Components/issues/96" target="_blank">[GitHub Issue #96]</a>
* **Strike Lookup:** Fixed an issue where help text would only appear if the form element was in focus <a href="https://github.com/appiphony/Strike-Components/issues/93" target="_blank">[GitHub Issue #93]</a>
* **Strike Multi Select Picklist:** Fixed an issue where cycling through options using arrow keys stopped working in Summer '17 <a href="https://github.com/appiphony/Strike-Components/issues/107" target="_blank">[GitHub Issue #107]</a>
* **Strike Radio Group:** Fixed an issue where radio group content was incorrectly showing and hiding <a href="https://github.com/appiphony/Strike-Components/issues/90" target="_blank">[GitHub Issue #90]</a>
* **Strike Select:** Fixed an issue where multiple dropdowns could be open at once <a href="https://github.com/appiphony/Strike-Components/issues/87" target="_blank">[GitHub Issue #87]</a>
* **Strike Select:** Fixed an issue where cycling through options using arrow keys stopped working in Summer '17 <a href="https://github.com/appiphony/Strike-Components/issues/88" target="_blank">[GitHub Issue #88]</a>
* **Strike Select:** Fixed an issue where an infinite loop would occur in certain rendering situations <a href="https://github.com/appiphony/Strike-Components/issues/92" target="_blank">[GitHub Issue #92]</a>
* **Strike Textarea:** Fixed an issue where the `disabled` attribute is incorrectly handled on Edge <a href="https://github.com/appiphony/Strike-Components/issues/96" target="_blank">[GitHub Issue #96]</a>
* **Strike Textarea:** Fixed an issue where live example doesn’t fully reset <a href="https://github.com/appiphony/Strike-Components/issues/98" target="_blank">[GitHub Issue #98]</a>
#### Notes
* **All Strike Components:** Components are now Lightning Linter compliant <a href="https://github.com/appiphony/Strike-Components/issues/59" target="_blank">[GitHub Issue #59]</a>

---

### Release 0.9.0 — August 11, 2017
#### New Features
* **Strike Progress Meter:** Progress meter used to represent progress or keep track of an inventory
#### Improvements
* **Strike Radio Group:** Added onchange event handler <a href="https://github.com/appiphony/Strike-Components/issues/43" target="_blank">[GitHub Issue #43]</a>
* **Strike Radio Group:** Value is always cast into a string <a href="https://github.com/appiphony/Strike-Components/issues/44" target="_blank">[GitHub Issue #44]</a>
* **Strike Radio Group Content:** A child component of Strike Radio Group that represents conditional content that can be displayed based on the Radio Group's value
#### Bug Fixes
* **Strike Modal:** Fixed an issue where the value of showModal attribute was always set to false <a href="https://github.com/appiphony/Strike-Components/issues/41" target="_blank">[GitHub Issue #41]</a>
* **Strike Multi Lookup:** Fixed an issue where browsers were throwing an error when a function was being called twice <a href="https://github.com/appiphony/Strike-Components/issues/49" target="_blank">[GitHub Issue #49]</a> and <a href="https://github.com/appiphony/Strike-Components/issues/55" target="_blank">[GitHub Issue #55]</a>
* **Strike Datepicker:** Fixed an issue where a warning was being thrown due to a deprecated function call <a href="https://github.com/appiphony/Strike-Components/issues/50" target="_blank">[GitHub Issue #50]</a>
* **Strike Carousel:** Removed an improperly registered event <a href="https://github.com/appiphony/Strike-Components/issues/60" target="_blank">[GitHub Issue #60]</a>
#### Notes
* **All Strike Components:** Updated licensing to BSD 3-Clause License

---

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
