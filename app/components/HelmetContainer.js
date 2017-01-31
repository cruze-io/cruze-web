import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import  {scriptsToLoad, linksToLoad} from '../constants/assetsToLoad'

const PROP_TYPES = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  fonts: PropTypes.array,
  route: PropTypes.string,
}

class HelmetContainer extends Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const {title, description, image, url, fonts, iconSet, route} = this.props
    const metaTitle = title || 'Stanza'
    const metaDescription = description || 'Powering Calendar Everywhere'
    const metaImage = image || 'https://dff2h0hbfv6w4.cloudfront.net/images/backgrounds/timeline.jpg'
    const metaUrl = url || 'https://stanza.co'
    const fontsToLoad = fonts && fonts.length ? fonts : ['300']
    const fontCdnUrl = "https://fonts.googleapis.com/css?family=Open+Sans:" + fontsToLoad.join()
    const fontasticWithCdn = '//dff2h0hbfv6w4.cloudfront.net/assets/fontastic.css'
    const fontasticIcons = 'https://file.myfontastic.com/qtuWRgVCv4hdoQ5fwThY7h/icons.css'
    const iconsCdnUrl = iconSet === 'ionicons'  ? 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' : fontasticIcons
    let links = [
      {"rel": "stylesheet", "href": "//dff2h0hbfv6w4.cloudfront.net/assets/normalize.css"},
      {"rel": "stylesheet", "href": "https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.css"},
      {"rel": "stylesheet", "href": "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v3.0.3/mapbox-gl-directions.css"},
      {"rel": "stylesheet", "href": iconsCdnUrl},
      {"rel": "stylesheet", "href": fontCdnUrl},
      {"rel": "canonical", "href": metaUrl},
    ]
    let scripts = []
    if (route && scriptsToLoad[route]) {
      scriptsToLoad[route].forEach((script) => {
        scripts.push({src: script, type: 'text/javascript'})
      })
    }

    if (route && linksToLoad[route]) {
      linksToLoad[route].forEach((link) => {
        links.push({"rel": "stylesheet", "href": link})
      })
    }

    return (
      <Helmet
        htmlAttributes={{"lang": "en", "amp": undefined}}
        title={metaTitle}
        titleTemplate={metaTitle}
        meta={[
          {"name": "viewport", "content":"width=device-width, initial-scale=1.0, minimum-scale=1.0"},
          {"name": "itemprop", "content": metaDescription},
          {"name": "description", "content": metaDescription},
          {"name": "og:image", "content": image},
          {"name": "og:url", "content": metaUrl},
          {"name": "og:title", "content": metaTitle},
          {"name": "og:description", "content": metaDescription},
          {"name": "twitter:title", "content": metaTitle},
          {"name": "twitter:site", "content": "@stanzacal"},
          {"name": "twitter:description", "content": metaDescription},
          {"name": "twitter:image:src", "content": image},
          {"name": "twitter:card", "content": "summary_large_image"},
          {"property": "og:type", "content": "article"},
        ]}
        link={links}
        scripts={scripts}
      />
    )
  }
}

export default HelmetContainer
