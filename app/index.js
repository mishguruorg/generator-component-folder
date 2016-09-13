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
        name: 'isContainer',
        message: '\nIs this a container (has direct access to state)?'
      }
    ]).then(function (ans) {
      const { compName, isContainer } = ans

      // Ensure component name is capitalized
      ans.compName = compName.charAt(0).toUpperCase() + compName.slice(1)

      // Write react component
      this.fs.copyTpl(
        this.templatePath(isContainer ? 'container.txt' : 'component.txt'),
        this.destinationPath(`${ans.compName}/index.jsx`),
        { name: ans.compName, elm: ans.elmType }
      )

      // Write enzyme tests
      this.fs.copyTpl(
        this.templatePath('spec.txt'),
        this.destinationPath(`${ans.compName}/index.spec.js`),
        { name: ans.compName, elm: ans.elmType }
      )

      // Write react-storybook file
      this.fs.copyTpl(
        this.templatePath('story.txt'),
        this.destinationPath(`${ans.compName}/index.story.jsx`),
        { name: ans.compName, elm: ans.elmType }
      )

      // Write scss styles
      this.copy('styles.txt', `${ans.compName}/styles.scss`)
    }.bind(this))
  }
})
