/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef CONTACTS_FFI_H
#define CONTACTS_FFI_H

#include "cj_common_ffi.h"

extern "C" {
    FFI_EXPORT int64_t FfiOHOSContactAddContact(int64_t contextId, OHOS::ContactsFfi::RawContact* rawContact,
                                                OHOS::ContactsFfi::ContactData* contactData, int32_t *errCode);
    FFI_EXPORT void FfiOHOSContactDeleteContact(int64_t contextId, int64_t predicatesId, int32_t *errCode);
    FFI_EXPORT void FfiOHOSContactUpdateContact(int64_t contextId, int64_t contactId,
                                                OHOS::ContactsFfi::ContactData* contactData,
                                                int64_t predicatesId, int32_t *errCode);
    FFI_EXPORT bool FfiOHOSContactIsLocalContact(int64_t contextId, int64_t contactId, int32_t *errCode);
    FFI_EXPORT bool FfiOHOSContactIsMyCard(int64_t contextId, int64_t contactId, int32_t *errCode);
    FFI_EXPORT OHOS::ContactsFfi::ContactsData* FfiOHOSContactQueryMyCard(int64_t contextId, int64_t predicatesId,
                                                                          int32_t *errCode);
    FFI_EXPORT OHOS::ContactsFfi::HoldersData* FfiOHOSContactQueryHolders(int64_t contextId, int32_t *errCode);
    FFI_EXPORT OHOS::ContactsFfi::ContactsData* FfiOHOSContactQueryContacts(int64_t contextId, int64_t predicatesId,
                                                                            int32_t *errCode);
    FFI_EXPORT OHOS::ContactsFfi::GroupsData* FfiOHOSContactQueryGroups(int64_t contextId, int64_t predicatesId,
                                                                        int32_t *errCode);
}

#endif // CONTACTS_FFI_H