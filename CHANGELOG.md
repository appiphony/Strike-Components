# Strike by Appiphony

### Release 0.2.0 — March 20, 2017

#### New Features
* **Strike Pill:** Formerly part of Strike Multi Select Picklist, Pill has been abstracted so it can be used in other upcoming Components
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
* **Strike Svg:** Changed `svg` component bundle to `strike_svg`
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

* **Lookup:** Fixed an issue where records with `null` values for the `search` and `subtitle` fields caused lookups to throw an exception <a href="https://github.com/appiphony/Strike-Components/issues/1" target="_blank">(GitHub Issue #1)</a>

---

### Release 0.1.0 — February 24, 2017
* Initial release
* Open sourced: <a href="https://github.com/appiphony/Strike-Components" target="_blank">https://github.com/appiphony/Strike-Components</a>
