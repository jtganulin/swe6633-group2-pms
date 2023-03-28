
const setEffort = (effort) => {

  if (effort !== undefined) {

    const payload = [...{
      effortType: effortType,
      timeCost: timeCost
    }] = effort;
    
    return payload;

  }

  return [];

}

const setRequirements = (requirements) => { 

  const allEfforts = setEffort(requirements.effort);

  if (requirements !== undefined) {

    const payload = [...{
      type: reqType,
      name: reqName,
      content: reqContent,
      effort: allEfforts
    }] = requirements;
    
    return payload;

  } 

  return [];

}

module.exports = {
  setRequirements
};

