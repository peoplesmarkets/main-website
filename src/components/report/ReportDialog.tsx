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
import { ContentLoading, Font } from "../content";
import { ActionButton, Form, MdTextField, SelectKey } from "../form";
import { DiscardConfirmationDialog } from "../form/DiscardConfirmationDialog";
import { MdSelect } from "../form/MdSelect";
import { MdDialog } from "../layout/MdDialog";

type Props = {
  show: boolean;
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
  const [loading, setLoading] = createSignal(false);

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

  function resetDialog() {
    setRequest(_.clone(emptyRequest));
    setIssueLink(undefined);
    setDiscardConfirmation(false);
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
      setLoading(true);
      try {
        const reponse = await reportService.create(request);
        setIssueLink(reponse.link);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
  }

  function handleCloseDialog() {
    if (dataWasChanged() && _.isNil(issueLink())) {
      setDiscardConfirmation(true);
    } else {
      confirmCloseDialog();
    }
  }

  function confirmCloseDialog() {
    resetDialog();
    props.onClose();
  }

  function continueEditing() {
    resetErrors();
    setDiscardConfirmation(false);
  }

  return (
    <>
      <MdDialog open={Boolean(props.show)} onClose={handleCloseDialog}>
        <div slot="headline">
          <Font type="title" key={TKEYS.report.title} />
        </div>

        <div slot="content">
          <Show when={!loading()} fallback={<ContentLoading page />}>
            <Show
              when={_.isNil(issueLink())}
              fallback={
                <>
                  <Font type="body" key={TKEYS.report["link-information"]} />

                  <Font type="body">
                    <A href={issueLink() || "#"} target="_blank">
                      {issueLink()}
                    </A>
                  </Font>
                </>
              }
            >
              <Form onSubmit={handleSubmitFeedback}>
                <MdSelect
                  type="outlined"
                  label={trans(TKEYS.report.labels.type)}
                  options={reportTypeOptions()}
                  selected={selectedReportType()}
                  onChange={handleReportTypeChange}
                />

                <MdTextField
                  type="text"
                  label={trans(TKEYS.report.labels.title)}
                  value={request.title}
                  onValue={handleTitleInput}
                  required
                  error={!_.isEmpty(errors.title)}
                  errorText={errors.title}
                />

                <MdTextField
                  type="textarea"
                  label={trans(TKEYS.report.labels.content)}
                  rows={8}
                  value={request.content}
                  onValue={handleContentInput}
                  required
                  error={!_.isEmpty(errors.content)}
                  errorText={errors.content}
                />
              </Form>
            </Show>
          </Show>
        </div>

        <div slot="actions">
          <Show
            when={_.isNil(issueLink())}
            fallback={
              <ActionButton actionType="neutral" onClick={handleCloseDialog}>
                <Trans key={TKEYS.form.action.OK} />
              </ActionButton>
            }
          >
            <ActionButton actionType="neutral" onClick={handleCloseDialog}>
              <Trans key={TKEYS.form.action.Close} />
            </ActionButton>

            <ActionButton
              actionType="active-filled"
              submit
              onClick={handleSubmitFeedback}
            >
              <Trans key={TKEYS.form.action.Send} />
            </ActionButton>
          </Show>
        </div>
      </MdDialog>

      <DiscardConfirmationDialog
        show={discardConfirmation()}
        onCancel={continueEditing}
        onDiscard={confirmCloseDialog}
      />
    </>
  );
}
