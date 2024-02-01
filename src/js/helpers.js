import { TIMEOUT_SEC_FAIL_FETCH } from "./config";

const timeoutFailFetch = function (p_s) {
  return new Promise(function (_, rejectFunk) {
    setTimeout(function () {
      rejectFunk(new Error("⚠️⚠️ Anfrage hat zu lange gedeaurt ⚠️⚠️"));
    }, p_s * 1000);
  });
};

export const getRandomIndex = function (p_max) {
  return Math.trunc(Math.random() * p_max);
};

export const getTestDataAndLength = function (p_data) {
  return {
    testData: p_data.test,
    testLength: p_data.test.vokabeln.length,
  };
};

export const AJAX = async function (p_gerWord) {
  try {
    const resp = await Promise.race([
      fetch(
        `https://api.mymemory.translated.net/get?q=${p_gerWord}!&langpair=de|en`
      ),
      timeoutFailFetch(TIMEOUT_SEC_FAIL_FETCH),
    ]);

    if (!resp.ok) throw new Error("⚠️⚠️ Es gab leider ein Problem ⚠️⚠️");

    const {
      responseData: { translatedText },
    } = await resp.json();

    return translatedText;
  } catch (p_err) {
    throw p_err;
  }
};

export const noVokabelAvailable = function () {
  alert("Sie haben kein Vokabeln für den Test");
};
