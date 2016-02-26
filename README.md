[Nunjucks](https://mozilla.github.io/nunjucks/) extension for [Brygga](https://github.com/LevelFourAB/brygga). This plugin will activate building of HTML from Nunjucks templates.

# Using

First setup [Brygga](https://github.com/LevelFourAB/brygga) for your project.

```
npm install --save-dev brygga-nunjucks
```

This will make the task `html` available.

# Structure

```
src/ - the source files
  pages/ - HTML pages
    index.html
  whatever.html - Partials can be placed anywhere under src
```

# Available tasks

Task: `html`
Config:
```js
// HTML is stored in the root
brygga.config.html.root = '';
// Config to look for HTML in the pages folder
brygga.config.html.src = [ 'pages/**/*.html' ];
// Use the entire source folder to include or import templates
brygga.config.html.templates = [ '' ];
```

### Data in templates

Templates support fetching data via JSON files and via front matter. Front matter is useful to set things such as titles and other variables used by templates. Example:

`pages/index.html`:
```
---
title: Test
---
{% extends 'layouts/base.html' %}

{% block content %}
<h1>{{ test }}</h1>
{% endblock %}
```

`layouts/base.html`:
```
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
    <link rel="stylesheet" href="/css/main.css">
</head>
<body>
    {% block content %}
    {% endblock %}
</body>
</html>
```

## Data

Brygga will load JSON files in the data folder when rendering templates. The name of the JSON file is mapped on the data object, so a file named `site.json` will have its data available as `site`.

See [Brygga](https://github.com/LevelFourAB/brygga) for details on configuration.
