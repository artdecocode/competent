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

## gets the context
<html lang="en">
  <child-props>Hello </child-props>
</html>

/* JSOptions */
{
  getContext() {
    return { childProp: 'World' }
  },
  getProps(htmlProps) {
    return { ...htmlProps, childProp: this.childProp }
  },
}
/**/

/* expected */
<rendered-html lang="en">The children are:<div>
  Hello World
</div></rendered-html>
/**/

## renders again
<render-again/>

/* expected */
<body-tag>%TEST_REPLACEMENTS%</body-tag>
/**/

## renders again with replacements
<render-again/>

/* JSOptions */
{
  getReplacements() {
    return { re: /%TEST_REPLACEMENTS%/, replacement: 'OK' }
  },
}
/**/

/* expected */
<body>OK</body>
/**/

## ignores void
<img src="test.jpg"><section-break />

/* expected */
<img src="test.jpg"><section-break />
/**/