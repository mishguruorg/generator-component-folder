var generators = require('yeoman-generator')

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
  },
  prompting: function () {
    return this.prompt([
      {
        type: 'input',
        name: 'compName',
        message: '\nName of the component:'
      },
      // defaults element type to `div`
      {
        type: 'input',
        name: 'elmType',
        message: '\nElement type:',
        default: 'div'
      },
      // defaults component type to `container`
      {
        type: 'confirm',
        name: 'isComponent',
        message: '\nIs this a component (not a container)?'
      }
    ]).then(function (ans) {
      const { compName, isComponent } = ans

      // Ensure component name is capitalized
      ans.compName = compName.charAt(0).toUpperCase() + compName.slice(1)

      // Write react component
      this.fs.copyTpl(
        this.templatePath(isComponent ? 'component.ejs' : 'container.ejs'),
        this.destinationPath(`${ans.compName}/index.jsx`),
        { name: ans.compName, elm: ans.elmType }
      )

      // Write enzyme tests
      this.fs.copyTpl(
        this.templatePath('spec.ejs'),
        this.destinationPath(`${ans.compName}/index.spec.js`),
        { name: ans.compName, elm: ans.elmType, isComp: ans.isComponent }
      )

      // Write react-storybook file
      this.fs.copyTpl(
        this.templatePath('story.ejs'),
        this.destinationPath(`${ans.compName}/index.story.jsx`),
        { name: ans.compName, elm: ans.elmType, isComp: ans.isComponent }
      )

      // Write scss styles
      this.copy('styles.ejs', `${ans.compName}/styles.scss`)
    }.bind(this))
  }
})
