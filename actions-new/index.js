

export const changeDatText = (text) => {
  return {
    type: 'CHANGE_TEXT',
    text
  }
}

export const goToPlacesDetail = (name, description) => {
  return {
    type: 'GO_TO_PLACES_DETAIL',
    name,
    description
  }
}
