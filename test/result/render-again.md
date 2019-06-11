## gets the replacements
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