import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import {
  CreateReportRequest,
  ReportType,
} from "../../services/peoplesmarkets/report/v1/report";
import { listReportTypeCodes } from "../../services/report/report";
import {
  ActionButton,
  Anotation,
  DiscardConfirmation,
  Select,
  SelectKey,
  TextArea,
  TextField,
} from "../form";
import { Dialog } from "../layout";
import styles from "./ReportDialog.module.scss";

type Props = {
  onClose: () => void;
};

export function ReportDialog(props: Props) {
  const [trans] = useTransContext();

  const { reportService } = useServiceClientContext();

  const emptyRequest: CreateReportRequest = {
    reportType: ReportType.REPORT_TYPE_BUG,
    title: "",
    content: "",
  };
  const updateFields = Object.keys(emptyRequest);

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [issueLink, setIssueLink] = createSignal<string | undefined>();

  const [errors, setErrors] = createStore({
    title: [] as string[],
    content: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  function reportTypeOptions() {
    return listReportTypeCodes().map((key) => ({
      name: trans(TKEYS.report.types[key]),
      key,
    }));
  }

  function selectedReportType() {
    if (!_.isNil(request.reportType)) {
      return _.find(reportTypeOptions(), {
        key: request.reportType,
      });
    }
  }

  function dataWasChanged() {
    return !_.isEqual(
      _.pick(emptyRequest, updateFields),
      _.pick(request, updateFields)
    );
  }

  function closeDialog() {
    if (dataWasChanged() && _.isNil(issueLink())) {
      setDiscardConfirmation(true);
    } else {
      props.onClose();
    }
  }

  function isValid() {
    let isValid = true;

    if (_.isEmpty(_.trim(request.title))) {
      setErrors("title", trans(TKEYS.form.errors["required-field"]));
      isValid = false;
    }

    if (_.isEmpty(_.trim(request.content))) {
      setErrors("content", trans(TKEYS.form.errors["required-field"]));
      isValid = false;
    }

    return isValid;
  }

  function resetErrors() {
    setErrors({ title: [], content: [] });
  }

  function handleReportTypeChange(value: SelectKey) {
    resetErrors();
    if (_.isNumber(value)) {
      setRequest("reportType", value);
    }
  }

  function handleTitleInput(value: string) {
    resetErrors();
    setRequest("title", value);
  }

  function handleContentInput(value: string) {
    resetErrors();
    setRequest("content", value);
  }

  async function handleSubmitFeedback(event: SubmitEvent) {
    event.preventDefault();

    if (isValid()) {
      const reponse = await reportService.create(request);
      setIssueLink(reponse.link);
    }
  }

  function confirmCloseDialog() {
    setDiscardConfirmation(false);
    props.onClose();
  }

  function continueEditing() {
    resetErrors();
    setDiscardConfirmation(false);
  }

  return (
    <>
      <Dialog title={trans(TKEYS.report.title)} onClose={closeDialog}>
        <Show
          when={!_.isNil(issueLink())}
          fallback={
            <form class={styles.Form} onSubmit={handleSubmitFeedback}>
              <Select
                label={trans(TKEYS.report.labels.type)}
                options={reportTypeOptions}
                value={selectedReportType}
                onValue={handleReportTypeChange}
              />

              <TextField
                label={trans(TKEYS.report.labels.title)}
                value={request.title}
                onValue={handleTitleInput}
                required
                errors={errors.title}
                small
              />

              <TextArea
                label={trans(TKEYS.report.labels.content)}
                rows={14}
                value={request.content}
                onValue={handleContentInput}
                required
                errors={errors.content}
              />

              <div class={styles.DialogFooter}>
                <ActionButton
                  actionType="active-filled"
                  submit
                  onClick={handleSubmitFeedback}
                >
                  <Trans key={TKEYS.form.action.Send} />
                </ActionButton>
              </div>
            </form>
          }
        >
          <div class={styles.Form}>
            <Anotation>
              <Trans key={TKEYS.report["link-information"]} />
            </Anotation>

            <Anotation>
              <A class={styles.Link} href={issueLink()!} target="_blank">
                {issueLink()}
              </A>
            </Anotation>
          </div>
        </Show>
      </Dialog>

      <Show when={discardConfirmation()}>
        <DiscardConfirmation
          onCancel={continueEditing}
          onDiscard={confirmCloseDialog}
        />
      </Show>
    </>
  );
}
