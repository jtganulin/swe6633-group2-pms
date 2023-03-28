
const setRequirement = (requirements) => {

  if (requirements !== undefined) {

    return [...{
      type: reqType,
      name: reqName,
      content: reqContent,
      effort: [...{
        effortType: effortType,
        timeCost: timeCost
      }] = requirements.effort || []
    }] = requirements;
      
  }

  return [];

}

module.exports = {
  setRequirement
}
