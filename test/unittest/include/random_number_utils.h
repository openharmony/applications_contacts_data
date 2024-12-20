/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

#ifndef RANDOM_NUMBER_UTILS_H
#define RANDOM_NUMBER_UTILS_H

#include <string>
#include <vector>

namespace OHOS {
namespace Contacts {
class RandomNumberUtils {
public:
    static constexpr int DECIMAL_NUMBER = 10;

    RandomNumberUtils();
    ~RandomNumberUtils();
    static std::string &Generating(int number);
};
} // namespace Contacts
} // namespace OHOS

#endif // RANDOM_NUMBER_UTILS_H
