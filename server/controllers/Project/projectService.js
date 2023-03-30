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


const setRisks = (risks) => {

  if (risks !== undefined) {
    return [...{
      name: riskName,
      content: riskContent,
      status: riskStatus
    }] = risks;
  }

  return [];

}

module.exports = {
  setRequirement,
  setRisks
}
