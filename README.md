# @adapttive/remark-responsible-tables

**Options**

```js
{
  'classnames': {
    'table': 'rwd-table',
    'row': 'rwd-row'
  }
}
```

```scss
$breakpoint-alpha: 480px; // adjust to your needs

.rwd-table {
  margin: 1em 0;
  min-width: 300px; // adjust to your needs
  
  tr {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    display: none; // for accessibility, use a visually hidden method here instead! Thanks, reddit!   
  }
  
  td {
    display: block; 
    
    &:first-child {
      padding-top: .5em;
    }
    &:last-child {
      padding-bottom: .5em;
    }

    &:before {
      content: attr(data-th)": "; // who knew you could do this? The internet, that's who.
      font-weight: bold;

      // optional stuff to make it look nicer
      width: 6.5em; // magic number :( adjust according to your own content
      display: inline-block;
      // end options
      
      @media (min-width: $breakpoint-alpha) {
        display: none;
      }
    }
  }
  
  th, td {
    text-align: left;
    
    @media (min-width: $breakpoint-alpha) {
      display: table-cell;
      padding: .25em .5em;
      
      &:first-child {
        padding-left: 0;
      }
      
      &:last-child {
        padding-right: 0;
      }
    }

  }
  
  
}


// presentational styling

@import 'https://fonts.googleapis.com/css?family=Montserrat:300,400,700';

body {
  padding: 0 2em;
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: #444;
  background: #eee;
}

h1 {
  font-weight: normal;
  letter-spacing: -1px;
  color: #34495E;
}

.rwd-table {
  background: #34495E;
  color: #fff;
  border-radius: .4em;
  overflow: hidden;
  tr {
    border-color: lighten(#34495E, 10%);
  }
  th, td {
    margin: .5em 1em;
    @media (min-width: $breakpoint-alpha) { 
      padding: 1em !important; 
    }
  }
  th, td:before {
    color: #dd5;
  }
}
```
