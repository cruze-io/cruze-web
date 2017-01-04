export const getLinks = (event) => {
    let links = event.dynamicTicketing || []
    if (event.ticketingPrimary) {
      links.push({
        text: 'Buy tickets here',
        url: event.ticketingPrimary,
      })
    }
    if (event.ticketingSecondary) {
      links.push({
        text: 'Buy tickets here: ',
        url: event.ticketingSecondary,
      })
    }
    return links
}

export default getLinks
