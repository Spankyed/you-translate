const purgecss = require('@fullhuman/postcss-purgecss')

// This will extract variants
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || []
  }
}

module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js')
  ],
}
//purge css fucking shit up
/*
    ...(false
      ? [
          purgecss({
            content: ['./src/*.js', './src/components/*.js'],
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: ['js']
              }
            ]
          })
        ]
      : [])
*/      