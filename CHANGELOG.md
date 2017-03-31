# Strike by Appiphony

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
* **Strike Datepicker:** Fixed an issue where clicking the SVG portion of the datepicker's button did not open the menu in Microsoft Edge <a href="https://github.com/appiphony/Strike-Components/issues/5" target="_blank">(GitHub Issue #5)</a>
* **Strike Lookup**: Fixed an issue where records were still selected after closing the menu without confirming a selection <a href="https://github.com/appiphony/Strike-Components/issues/2" target="_blank">(GitHub Issue #2)</a>
* **Strike Lookup**: Fixed an issue where the menu doesn't close when tabbing out of the input <a href="https://github.com/appiphony/Strike-Components/issues/4" target="_blank">(GitHub Issue #4)</a>
* **Strike Lookup**: Fixed an issue where the input's search icon was incorrectly positioned
* **Strike Lookup**: Removed `debugger` line <a href="https://github.com/appiphony/Strike-Components/issues/6" target="_blank">(GitHub Issue #6)</a>
* **Strike Multi Select Picklist**: Fixed an issue where the input's search icon was incorrectly positioned
* **Strike Multi Select Picklist**: Fixed an issue where selected pills did not have spacing between them
* **Strike Select:** Fixed an issue where the component was not focusable
* **Strike Select:** Fixed an issue where initialized values were not set
* **Strike Textarea:** Fixed an issue where the `value` attribute would not update when the textarea's value is updated via the contextmenu

---

### Release 0.1.1 — March 1, 2017

#### Bug Fixes
* **Lookup:** Fixed an issue where records with `null` values for the `search` and `subtitle` fields caused lookups to throw an exception <a href="https://github.com/appiphony/Strike-Components/issues/1" target="_blank">(GitHub Issue #1)</a>

---

### Release 0.1.0 — February 24, 2017
* Initial release
* Open sourced: <a href="https://github.com/appiphony/Strike-Components" target="_blank">https://github.com/appiphony/Strike-Components</a>
