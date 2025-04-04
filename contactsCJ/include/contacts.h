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

#ifndef CONTACTS_H
#define CONTACTS_H

#include <cstdint>
#include "contacts_utils.h"
#include "datashare_values_bucket.h"

namespace OHOS {
namespace ContactsFfi {

class Contacts {
public:
    static const int INVALID_CONTACT_ID = -1;

    Contacts() {}
    ~Contacts() = default;

    static int64_t CJaddContact(int64_t contextId, OHOS::DataShare::DataShareValuesBucket rawContact,
                                std::vector<OHOS::DataShare::DataShareValuesBucket> contact, int32_t *errCode);
    static void CJdeleteContact(int64_t contextId, int64_t predicatesId, int32_t *errCode);
    static void CJupdateContact(int64_t contextId, int64_t contactId,
                                std::vector<OHOS::DataShare::DataShareValuesBucket> contactData,
                                int64_t predicatesId, int32_t *errCode);
    static bool CJisLocalContact(int64_t contextId, int64_t contactId, int32_t *errCode);
    static bool CJisMyCard(int64_t contextId, int64_t contactId, int32_t *errCode);
    static ContactsData* CJqueryMyCard(int64_t contextId, int64_t predicatesId, int32_t *errCode);
    static HoldersData* CJqueryHolders(int64_t contextId, int32_t *errCode);
    static ContactsData* CJqueryContacts(int64_t contextId, int64_t predicatesId, int32_t *errCode);
    static GroupsData* CJqueryGroups(int64_t contextId, int64_t predicatesId, int32_t *errCode);
};
} // namespace ContactsFfi
} // namespace OHOS

#endif // CONTACTS_H
