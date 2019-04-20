## !returns the correct output
<html lang="en">Hello World</html>

/* expected */
<rendered-html lang="en">The children are:<div>Hello World</div></rendered-html>
/**/

## !returns text with inner input
<html lang="en">
  <body page="test">Hello World</body>
</html>

/* expected */
<rendered-html lang="en">The children are:<div>
  <body-tag page="test">Hello World</body-tag>
</div></rendered-html>
/**/