const icons = {
  'turn right': '/assets/navigation-icons/turn-right.png',
  'turn left': '/assets/navigation-icons/turn-left.png',
  'u turn': '/assets/navigation-icons/u-turn.png',
  'continue': '/assets/navigation-icons/straight.png',
}

const getIcon = (type) => {
  return icons[type] || icons['continue']
}

const navigationIcons = {
  icons,
  getIcon,
}

export default navigationIcons
