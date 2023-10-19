import { useNavigate, useSearchParams } from "@solidjs/router";
import _ from "lodash";
import { createEffect, createResource, onMount } from "solid-js";

import { isResolved } from "../../components/content";
import { Slot } from "../../components/layout";
import { Cover } from "../../components/layout/Cover";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { base64ToUtf8 } from "../../lib";
import { buildDashboardPath, buildIndexPath } from "../main-routing";
import MainRoutesWrapper from "../MainRoutesWrapper";

export default function SignInCallback() {
  const { startSessionWithCode } = useAccessTokensContext();
  const [{ code, state }] = useSearchParams();
  const navigate = useNavigate();

  const [startSession] = createResource(
    () => code,
    async (code) => startSessionWithCode(code)
  );

  createEffect(() => {
    if (isResolved(startSession.state)) {
      if (!_.isNil(state) && !_.isEmpty(state)) {
        navigate(base64ToUtf8(state), { replace: true });
      } else {
        navigate(buildDashboardPath(), { replace: true });
      }
    }

    if (startSession.state === "errored") {
      navigate(buildIndexPath(), { replace: true });
    }
  });

  onMount(() => {
    if (_.isNil(code) || _.isEmpty(code)) {
      navigate(buildIndexPath(), { replace: true });
    }
  });

  return (
    <MainRoutesWrapper>
      <Slot name="content">
        <Cover pageLoad />
      </Slot>
    </MainRoutesWrapper>
  );
}
