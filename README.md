# CMS admin LTE

### Prerequisites

* NodeJS (npm) (nodejs.org)
* Grunt
* Bower
* Yeoman
* cg-angular-generator

## Installation


```$ npm install```

```$ bower install```

```$ npm install -g generator-cg-angular```

```$ npm install i express -S```

```$ npm install i mongoose -S```

```$ npm install i cors -S```

```$ npm install i body-parser -S```

## Development

To test while developing and get a preview run:

```$ grunt serve```

To create a new **partial** or state run:

```$ yo cg-angular:partial {partial-name}```

To create a new **service** run:

```$ yo cg-angular:service {service-name}```

To create a new **directive** run:

```$ yo cg-angular:directive {directive-name}```

#### States

To add a new state to your application define one through the ```$stateProvider``` in the config method in app.js

```javascript
$stateProvider.state('my-state', {
	
	templateUrl	: 'partials/my-state/my-state.html',
	controller	: 'MyStateCtrl'

});
```











