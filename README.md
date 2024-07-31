# Technowiccan Herbal Companion (TWHC) 2.0

A web-based searchable herb database of *Cunningham's Encyclopedia of Magical Herbs* built using Vue 3 and Firebase Firestore. Search by name, scientific name, folk name, planet, element, deity, or property, or filter on multiple characteristics.

# known issues/fix list
 - combine search and multisearch into one component (most of the same code anyway)
 - for multisearch, clicking search w/o any fields filled will return the entire plant list
 - fix capitalization for "search by" on regular search page (probably roll into first bulletpoint)
 - globalize style by pulling it out into app.vue
 - weird delay in loading entire plant list
 - when viewing info for specific plant, can see blank/placeholder values for a small but noticeable length of time
