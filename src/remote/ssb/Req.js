/**
 * Created on 09 Dec 2021 by lonmee
 */

export interface CreateIdentityReq {
  type: 'identity.create';
}

export interface UseIdentityReq {
  type: 'identity.use';
}

export interface PublishReq {
  type: 'publish';
  content: NonNullable<Content | AliasContent>;
}

export interface PublishAboutReq {
  type: 'publishAbout';
  content: AboutContent;
}

export interface AcceptInviteReq {
  type: 'invite.accept';
  invite: string;
}

export interface SearchBluetoothReq {
  type: 'bluetooth.search';
  interval: number;
}

export interface ConnStartReq {
  type: 'conn.start';
}

export interface ConnConnectReq {
  type: 'conn.connect';
  address: string;
  hubData?: any;
}

export interface ConnRememberConnectReq {
  type: 'conn.rememberConnect';
  address: string;
  data?: any;
}

export interface ConnDisconnectReq {
  type: 'conn.disconnect';
  address: string;
}

export interface ConnDisconnectForgetReq {
  type: 'conn.disconnectForget';
  address: string;
}

export interface ConnForgetReq {
  type: 'conn.forget';
  address: string;
}

export interface RoomConsumeInviteUri {
  type: 'httpInviteClient.claim';
  uri: string;
}

export interface RoomSignInUri {
  type: 'httpAuthClient.signIn';
  uri: string;
}

export interface RoomConsumeAliasUri {
  type: 'roomClient.consumeAliasUri';
  uri: string;
}

export interface SettingsHopsReq {
  type: 'settings.hops';
  hops: number;
}

export interface SettingsBlobsPurgeReq {
  type: 'settings.blobsPurge';
  storageLimit: number;
}

export interface SettingsShowFollowsReq {
  type: 'settings.showFollows';
  showFollows: boolean;
}

export interface SettingsDetailedLogsReq {
  type: 'settings.detailedLogs';
  detailedLogs: boolean;
}

export type Req =
  | CreateIdentityReq
  | UseIdentityReq
  | PublishReq
  | PublishAboutReq
  | AcceptInviteReq
  | SearchBluetoothReq
  | ConnStartReq
  | ConnConnectReq
  | ConnRememberConnectReq
  | ConnDisconnectReq
  | ConnDisconnectForgetReq
  | ConnForgetReq
  | RoomConsumeInviteUri
  | RoomSignInUri
  | RoomConsumeAliasUri
  | SettingsHopsReq
  | SettingsBlobsPurgeReq
  | SettingsShowFollowsReq
  | SettingsDetailedLogsReq;
