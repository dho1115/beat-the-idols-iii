import { UpdateDataAPI } from "../../functions/updateapi"

export const updateAndAddProperty = (url, updatedData, setStateDeclaration) => {
   try {
      if (typeof (setStateDeclaration) != 'function') throw new Error(`Your setStateDeclaration argument must be a function in the form of () => setState(...). You have a type of ${typeof (setStateDeclaration)}.`);

      return UpdateDataAPI(url, updatedData)
         .then(result => setStateDeclaration())
         .catch(error => console.error({ from: 'updateAndAddProperty function', error, message: error.message }))
   } catch (err) {
      console.error({ err, errCode: err.code, errMessage: err.message });
      return err;
   }
}