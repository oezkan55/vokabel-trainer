import { VOKABEL_COUNT_ZERO, TIMEOUT_SEC_NEXT_VOK } from "./config";
import { getTestDataAndLength, noVokabelAvailable } from "./helpers";
import * as model from "./model";
import ApplicationView from "./views/ApplicationView";
import FaqView from "./views/FaqView";
import TestFormView from "./views/TestFormView";
import VokabelListView from "./views/VokabelListView";
import CreateFormView from "./views/createVokabel/CreateFormView";
import TranslateView from "./views/createVokabel/TranslateView";
import DesktopNavView from "./views/navigation/DesktopNavView";
import MobileNavView from "./views/navigation/MobileNavView";

const controlTranslate = async function (p_gerWord) {
  try {
    TranslateView.toggleShowLoader();

    const engWord = await model.translateToEnglish(p_gerWord);
    TranslateView.renderTranslatedWord(engWord);

    TranslateView.toggleShowLoader();
  } catch (p_err) {
    alert(p_err.message);
    TranslateView.toggleShowLoader();
  }
};

const controlCreateVokabel = function (p_vokData) {
  model.saveVokabel(p_vokData);
  VokabelListView.renderVokabel(model.state.vokabeln.at(-1));
  CreateFormView.renderAddedMessage();
};

const controlTest = function (p_engWord) {
  const isValid = model.isSolutionEqualWanted(p_engWord);
  model.updateTestResult(isValid);
  const { testData, testLength } = getTestDataAndLength(model.state);

  if (isValid && testLength === VOKABEL_COUNT_ZERO) {
    TestFormView.testOver(testData.result);
  }

  if (isValid && testLength > VOKABEL_COUNT_ZERO) {
    model.pickWantedVok();
    TestFormView.renderSolutionState(isValid);

    //? Kleine Verzögerung für die nächste Abfrage
    setTimeout(
      TestFormView.vokabelQuiz.bind(TestFormView, testData),
      TIMEOUT_SEC_NEXT_VOK * 1000
    );
  }

  if (!isValid) {
    TestFormView.renderSolutionState(isValid);
  }
};

const controlNextVokabel = function () {
  model.updateTestResult();
  const { testData, testLength } = getTestDataAndLength(model.state);

  if (testLength === VOKABEL_COUNT_ZERO) TestFormView.testOver(testData.result);

  if (testLength > VOKABEL_COUNT_ZERO) {
    model.pickWantedVok();
    TestFormView.vokabelQuiz(testData);
  }
};

const controlDeleteVokabel = function (p_wordId, p_vokabelEl) {
  model.deleteEntry(p_wordId);
  VokabelListView.removeVokabel(p_vokabelEl);
};

const controlMobileViewShowTargetHideOthers = function (p_targetDescript) {
  if (p_targetDescript === "application") {
    ApplicationView.mobileViewShowApplication();
    VokabelListView.mobileViewHideSidebar();
  }

  if (p_targetDescript === "sidebar") {
    ApplicationView.mobileViewHideApplication();
    VokabelListView.mobileViewShowSidebar();
  }

  MobileNavView.toggleOpenNavigation();
};

const controlNavigation = function (p_targetDescript) {
  if (p_targetDescript === "create") {
    CreateFormView.showForm();
    VokabelListView.showList();
  }

  if (p_targetDescript === "test") {
    //? Wenn KEINE Vokabeln, Test nicht starten
    if (model.state.vokabeln.length === VOKABEL_COUNT_ZERO)
      return noVokabelAvailable();

    model.prepareVokabelTest();
    TestFormView.vokabelQuiz(model.state.test);
    VokabelListView.hideList();
  }

  if (p_targetDescript === "vokabeln") {
    controlMobileViewShowTargetHideOthers(p_targetDescript);
  }

  if (p_targetDescript === "faq") {
    FaqView.toggleShowModal();
  }
};

const init = function () {
  TranslateView.addHandlerTranslate(controlTranslate);
  CreateFormView.addHandlerCreate(controlCreateVokabel);
  TestFormView.addHandlerCheckSolution(controlTest);
  TestFormView.addHandlerNextVok(controlNextVokabel);
  VokabelListView.renderList(model.state.vokabeln);
  VokabelListView.addHandlerDeleteVokabel(controlDeleteVokabel);

  DesktopNavView.addHandlerShowTarget(controlNavigation);
  MobileNavView.addHandlerShowTarget(
    controlNavigation,
    controlMobileViewShowTargetHideOthers
  );
};
init();
