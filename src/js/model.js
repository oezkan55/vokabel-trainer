import { PICK_COUNT_VOK } from "./config";
import { AJAX, getRandomIndex } from "./helpers";

export const state = {
  vokabeln: [
    { german: "morgen", english: "morning" },
    { german: "tisch", english: "table" },
  ],
  test: {
    vokabeln: [],
    length: 0,
    result: {
      true: 0,
      false: 0,
    },
    wantedVok: "",
  },
};

export const translateToEnglish = async function (p_gerWord) {
  try {
    const translatedWord = await AJAX(p_gerWord);

    return translatedWord;
  } catch (p_err) {
    throw p_err;
  }
};

const createVokabelObject = function (p_data) {
  const vokabel = Object.fromEntries(p_data);
  return vokabel;
};

export const saveVokabel = function (p_vokData) {
  const vokabel = createVokabelObject(p_vokData);
  state.vokabeln.push(vokabel);
};

export const pickWantedVok = function () {
  const index = getRandomIndex(state.test.vokabeln.length);
  const [vokabel] = state.test.vokabeln.splice(index, PICK_COUNT_VOK);
  state.test.wantedVok = vokabel;
};

const resetTestResult = function () {
  state.test.result.true = 0;
  state.test.result.false = 0;
};

export const prepareVokabelTest = function () {
  state.test.vokabeln = state.vokabeln.slice();
  state.test.length = state.vokabeln.length;
  resetTestResult();
  pickWantedVok();
};

export const isSolutionEqualWanted = function (p_solution) {
  return state.test.wantedVok.english === p_solution;
};

export const updateTestResult = function (isCorrect = false) {
  state.test.result[isCorrect ? "true" : "false"]++;
};

const getEntryIndex = function (p_entryId) {
  return state.vokabeln.findIndex(p_entry => p_entry.german === p_entryId);
};

export const deleteEntry = function (p_vokId) {
  const index = getEntryIndex(p_vokId);
  state.vokabeln.splice(index, PICK_COUNT_VOK);
};
