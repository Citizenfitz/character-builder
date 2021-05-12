function formatNumberSuffix(number) {
  switch(number) {
      case 1:
          return number+'st';
      break;
      case 2:
          return number+'nd';
      break;
      case 3:
          return number+'rd';
      break;
      default:
          return number+'th';
  }
}

export default formatNumberSuffix;


