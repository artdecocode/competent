## returns the correct output
<html lang="en">Hello World</html>

/* expected */
<rendered-html lang="en">The children are:<div>Hello World</div></rendered-html>
/**/

## returns text with inner input
<html lang="en">
  <body page="test">Hello World</body>
</html>

/* expected */
<rendered-html lang="en">The children are:<div>
  <body-tag page="test">Hello World</body-tag>
</div></rendered-html>
/**/

## removes the component it cannot process
<html lang="en">
  Error:<error>Hello world</error>
</html>

/* options */
{ "removeOnError": true }
/**/

/* expected */
<rendered-html lang="en">The children are:<div>
  Error:
</div></rendered-html>
/**/

## does not remove the component it cannot process
<html lang="en">
  Error:<error>Hello world</error>
</html>

/* expected */
<rendered-html lang="en">The children are:<div>
  Error:<error>Hello world</error>
</div></rendered-html>
/**/

## correctly processes self-closing
<page-title />
<link href="https://fonts.googleapis.com/css?family=Ruda" rel="stylesheet">
<ajax-loader />

/* expected */
<rendered-page-title/>
<link href="https://fonts.googleapis.com/css?family=Ruda" rel="stylesheet">
<rendered-ajax-loader/>
/**/
