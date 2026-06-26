import { ServiceInfo } from "apis/eduidLogin";
import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";

interface LoginAtServiceInfoProps {
  service_info?: ServiceInfo;
}

/**
 * Show information about where the user is about to log in (source: MDUI display name from federation metadata)
 */
export function LoginAtServiceInfo({ service_info }: Readonly<LoginAtServiceInfoProps>): React.JSX.Element | null {
  const locale = useAppSelector((state) => state.intl.locale);
  let service_name;

  if (!service_info?.display_name) {
    return null;
  }

  if (service_info.display_name[locale]) {
    service_name = service_info.display_name[locale];
  } else {
    service_name = service_info.display_name["en"];
  }

  if (!service_name) {
    return null;
  }

  return (
    <p>
      <FormattedMessage
        defaultMessage="Use eduID to access {service_name}"
        values={{
          service_name: <strong>{service_name}</strong>,
        }}
      />
    </p>
  );
}
