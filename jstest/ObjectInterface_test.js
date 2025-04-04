/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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

import contactsapi from '@ohos.contact';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'deccjsunit/index';

const URI_CONTACTS = 'datashare:///com.ohos.contactsdataability';
const groupUri = 'datashare:///com.ohos.contactsdataability/contacts/groups';
const rawContactUri = 'datashare:///com.ohos.contactsdataability/contacts/raw_contact';
const profileRawContactUri = 'datashare:///com.ohos.contactsdataability/profile/raw_contact';
const ATTRIBUTE_ONE = 1;
const ATTRIBUTE_TWO = 2;
const ATTRIBUTE_THREE = 3;
const ATTRIBUTE_FOUR = 4;
const ATTRIBUTE_FIVE = 5;
const ATTRIBUTE_SIX = 6;
const ATTRIBUTE_SEVEN = 7;
const ATTRIBUTE_EIGHT = 8;
const ATTRIBUTE_NINE = 9;
const ATTRIBUTE_TEN = 10;
const ATTRIBUTE_ELEVEN = 11;
const ATTRIBUTE_TWELVE = 12;
const ATTRIBUTE_THIRTEEN = 13;
const ATTRIBUTE_FOURTEEN = 14;
const ONE_HUNDERD = 100;
const SLEEP_TIME = 2000;

describe('ObjectInterfaceTest', function () {
  function sleep(numberMillis) {
    let now = new Date();
    let exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime) {
        return;
      }
    }
  }

  let contactData = {
    id: 0,
    key: '0',
    contactAttributes: { attributes: [ATTRIBUTE_ONE, ATTRIBUTE_TWO, ATTRIBUTE_THREE, ATTRIBUTE_FOUR, ATTRIBUTE_FIVE,
      ATTRIBUTE_SIX, ATTRIBUTE_SEVEN, ATTRIBUTE_EIGHT, ATTRIBUTE_NINE, ATTRIBUTE_TEN, ATTRIBUTE_ELEVEN,
      ATTRIBUTE_TWELVE, ATTRIBUTE_THIRTEEN, ATTRIBUTE_FOURTEEN] },
    emails: [{ email: 'email', labelName: '自定义邮箱', labelId: 1, displayName: 'emailDisplayName' }],
    events: [{ eventDate: 'event', labelName: '自定义event', labelId: 2 }],
    groups: [{ groupId: 1, title: '群组' }],
    imAddresses: [{ imAddress: 'imAddress', labelName: '自定义', labelId: 3 }],
    phoneNumbers: [{ phoneNumber: '183', labelName: '自定义phoneNumbers', labelId: 4 }],
    portrait: { uri: 'content://head/0' },
    postalAddresses: [
      {
        city: '南京',
        country: '中国',
        labelName: 'labelName',
        neighborhood: 'neighborhood',
        pobox: 'pobox',
        postalAddress: 'postalAddress',
        postcode: 'postcode',
        region: 'region',
        street: 'street',
        labelId: 5
      }
    ],
    relations: [{ relationName: 'relationName', labelName: '自定义relationName', labelId: 6 }],
    sipAddresses: [{ sipAddress: 'sipAddress', labelName: '自定义sipAddress', labelId: 6 }],
    websites: [{ website: 'website' }],
    name: {
      familyName: 'familyName',
      familyNamePhonetic: 'familyNamePhonetic',
      fullName: '小李',
      givenName: 'givenName',
      givenNamePhonetic: 'givenNamePhonetic',
      middleName: 'middleName',
      middleNamePhonetic: 'middleNamePhonetic',
      namePrefix: 'namePrefix',
      nameSuffix: 'nameSuffix'
    },
    nickName: { nickName: 'nickName' },
    note: { noteContent: 'note' },
    organization: { name: 'TT', title: '开发' }
  };

  let gRawContactId;

  /**
   * @tc.number  contactsApi_insert_test_100
   * @tc.name    Insert contact information
   * @tc.desc    Function test
   */
  it('contactsApi_insert_test_100', 0, async function (done) {
    try {
      let rawContactId = await contactsapi.addContact(contactData);
      console.info('contactsApi_insert_test_100 : rawContactId = ' + rawContactId);
      gRawContactId = rawContactId;
      expect(gRawContactId > 0).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_insert_test_100 : raw_contact insert error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_delete_test_200
   * @tc.name    Delete contact information
   * @tc.desc    Function test
   */
  it('contactsApi_delete_test_200', 0, async function (done) {
    let deleteId = gRawContactId;
    try {
      let deleteCode = await contactsapi.deleteContact(deleteId);
      let gDelete = deleteCode;
      console.info('contactsApi_delete_test_200 : deleteCode = ' + deleteCode);
      expect(gDelete === 0).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_delete_test_200 : delete error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_update_test_300
   * @tc.name    Update contact information
   * @tc.desc    Function test
   */
  it('contactsApi_update_test_300', 0, async function (done) {
    let rawContactId = await contactsapi.addContact(contactData);
    console.info('contactsApi_insert_test_300 : rawContactId = ' + rawContactId);
    gRawContactId = rawContactId;
    expect(rawContactId > 0).assertTrue();

    let updateValues = { id: gRawContactId, name: { fullName: '小红' } };
    let condition = { attributes: [ATTRIBUTE_SIX] };
    try {
      let updateCode = await contactsapi.updateContact(updateValues, condition);
      console.info('contactsApi_update_test_300 : updateCode = ' + updateCode);
      expect(updateCode === 0).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_update_test_300 : update error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_contact_test_400
   * @tc.name    Query contacts information
   * @tc.desc    Function test
   */
  it('contactsApi_query_contact_test_400', 0, async function (done) {
    let queryId = gRawContactId;
    try {
      let resultSet = await contactsapi.queryContact(queryId);
      console.info('contactsApi_query_contact_test_400 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_contact_test_400 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_contact_test_500
   * @tc.name    Query contacts information
   * @tc.desc    Function test
   */
  it('contactsApi_query_contact_test_500', 0, async function (done) {
    let queryId = gRawContactId.toString();
    let holder = { bundleName: 'com.ohos.contacts', displayName: 'phone', holderId: 1 };
    try {
      let resultSet = await contactsapi.queryContact(queryId, holder);
      console.info('contactsApi_query_contact_test_500 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_contact_test_500 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_contact_test_600
   * @tc.name    Query contacts information
   * @tc.desc    Function test
   */
  it('contactsApi_query_contact_test_600', 0, async function (done) {
    let queryId = gRawContactId.toString();
    let holder = { bundleName: 'com.ohos.contacts', displayName: 'phone', holderId: 1 };
    let ContactAttributes = { attributes: [ATTRIBUTE_ONE, ATTRIBUTE_FIVE, ATTRIBUTE_SIX] };
    try {
      let resultSet = await contactsapi.queryContact(queryId, holder, ContactAttributes);
      console.info('contactsApi_query_contact_test_600 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_contact_test_600 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_contacts_test_700
   * @tc.name    Query contacts information
   * @tc.desc    Function test
   */
  it('contactsApi_query_contacts_test_700', 0, async function (done) {
    try {
      let resultSet = await contactsapi.queryContacts();
      console.info('contactsApi_query_contacts_test_700 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet != null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_contacts_test_700 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_contacts_test_800
   * @tc.name    Query contacts information
   * @tc.desc    Function test
   */
  it('contactsApi_query_contacts_test_800', 0, async function (done) {
    let holder = { bundleName: 'com.ohos.contacts', displayName: 'phone', holderId: 1 };
    try {
      let resultSet = await contactsapi.queryContacts(holder);
      console.info('contactsApi_query_contacts_test_800 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_contacts_test_800 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_contacts_test_900
   * @tc.name    Query contacts information
   * @tc.desc    Function test
   */
  it('contactsApi_query_contacts_test_900', 0, async function (done) {
    let ContactAttributes = { attributes: [ATTRIBUTE_ONE, ATTRIBUTE_FIVE, ATTRIBUTE_SIX] };
    try {
      let resultSet = await contactsapi.queryContacts(ContactAttributes);
      console.info('contactsApi_query_contacts_test_900 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_contacts_test_900 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_contacts_test_1000
   * @tc.name    Query contacts information
   * @tc.desc    Function test
   */
  it('contactsApi_query_contacts_test_1000', 0, async function (done) {
    let holder = { bundleName: 'com.ohos.contacts', displayName: 'phone', holderId: 1 };
    let ContactAttributes = { attributes: [ATTRIBUTE_ONE, ATTRIBUTE_FIVE, ATTRIBUTE_SIX] };
    try {
      let resultSet = await contactsapi.queryContacts(holder, ContactAttributes);
      console.info('contactsApi_query_contacts_test_1000 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_contacts_test_1000 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_email_test_1100
   * @tc.name    Query email information
   * @tc.desc    Function test
   */
  it('contactsApi_query_email_test_1100', 0, async function (done) {
    let email = 'email';
    let holder = { bundleName: 'com.ohos.contacts', displayName: 'phone', holderId: 1 };
    try {
      let resultSet = await contactsapi.queryContactsByEmail(email, holder);
      console.info('contactsApi_query_email_test_1100 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_email_test_1100 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_email_test_1200
   * @tc.name    Query email information
   * @tc.desc    Function test
   */
  it('contactsApi_query_email_test_1200', 0, async function (done) {
    let email = 'email';
    try {
      let resultSet = await contactsapi.queryContactsByEmail(email);
      console.info('contactsApi_query_email_test_1200 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_email_test_1200 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_email_test_1300
   * @tc.name    Query email information
   * @tc.desc    Function test
   */
  it('contactsApi_query_email_test_1300', 0, async function (done) {
    let email = 'email';
    let holder = { bundleName: 'com.ohos.contacts', displayName: 'phone', holderId: 1 };
    let ContactAttributes = { attributes: [ATTRIBUTE_ONE, ATTRIBUTE_FIVE, ATTRIBUTE_SIX] };
    try {
      let resultSet = await contactsapi.queryContactsByEmail(email, holder, ContactAttributes);
      console.info('contactsApi_query_email_test_1300 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_email_test_1300 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_email_test_1400
   * @tc.name    Query email information
   * @tc.desc    Function test
   */
  it('contactsApi_query_email_test_1400', 0, async function (done) {
    let email = 'email';
    let ContactAttributes = { attributes: [ATTRIBUTE_ONE, ATTRIBUTE_FIVE, ATTRIBUTE_SIX] };
    try {
      let resultSet = await contactsapi.queryContactsByEmail(email, ContactAttributes);
      console.info('contactsApi_query_email_test_1400 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_email_test_1400 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_phoneNumber_test_1500
   * @tc.name    Query phoneNumber information
   * @tc.desc    Function test
   */
  it('contactsApi_query_phoneNumber_test_1500', 0, async function (done) {
    let phoneNumber = '183';
    let holder = { bundleName: 'com.ohos.contacts', displayName: 'phone', holderId: 1 };
    try {
      let resultSet = await contactsapi.queryContactsByPhoneNumber(phoneNumber, holder);
      console.info('contactsApi_query_phoneNumber_test_1500 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_phoneNumber_test_1500 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_phoneNumber_test_1600
   * @tc.name    Query phoneNumber information
   * @tc.desc    Function test
   */
  it('contactsApi_query_phoneNumber_test_1600', 0, async function (done) {
    let phoneNumber = '183';
    let holder = { bundleName: 'com.ohos.contacts', displayName: 'phone', holderId: 1 };
    let ContactAttributes = { attributes: [ATTRIBUTE_ONE, ATTRIBUTE_FIVE, ATTRIBUTE_SIX] };
    try {
      let resultSet = await contactsapi.queryContactsByPhoneNumber(phoneNumber, holder, ContactAttributes);
      console.info('contactsApi_query_phoneNumber_test_1600 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_phoneNumber_test_1600 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_phoneNumber_test_1700
   * @tc.name    Query phoneNumber information
   * @tc.desc    Function test
   */
  it('contactsApi_query_phoneNumber_test_1700', 0, async function (done) {
    let phoneNumber = '183';
    try {
      let resultSet = await contactsapi.queryContactsByPhoneNumber(phoneNumber);
      console.info('contactsApi_query_phoneNumber_test_1700 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_phoneNumber_test_1700 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_phoneNumber_test_1800
   * @tc.name    Query phoneNumber information
   * @tc.desc    Function test
   */
  it('contactsApi_query_phoneNumber_test_1800', 0, async function (done) {
    let phoneNumber = '183';
    let ContactAttributes = { attributes: [ATTRIBUTE_ONE, ATTRIBUTE_FIVE, ATTRIBUTE_SIX] };
    try {
      let resultSet = await contactsapi.queryContactsByPhoneNumber(phoneNumber, ContactAttributes);
      console.info('contactsApi_query_phoneNumber_test_1800 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_phoneNumber_test_1800 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_group_test_1900
   * @tc.name    Query group
   * @tc.desc    Function test
   */
  it('contactsApi_query_group_test_1900', 0, async function (done) {
    try {
      let resultSet = await contactsapi.queryGroups();
      console.info('contactsApi_query_group_test_1900 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet.length === 0).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_group_test_1900 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_group_test_2000
   * @tc.name    Query group
   * @tc.desc    Function test
   */
  it('contactsApi_query_group_test_2000', 0, async function (done) {
    let holder = { bundleName: 'com.ohos.contacts', displayName: 'phone', holderId: 1 };
    try {
      let resultSet = await contactsapi.queryGroups(holder);
      console.info('contactsApi_query_group_test_2000 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet.length === 0).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_group_test_2000 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_holders_test_2200
   * @tc.name    Query holders information
   * @tc.desc    Function test
   */
  it('contactsApi_query_holders_test_2200', 0, async function (done) {
    try {
      let resultSet = await contactsapi.queryHolders();
      console.info('contactsApi_query_holders_test_2200 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet !== null).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_holders_test_2200 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_key_test_2300
   * @tc.name    Query key information
   * @tc.desc    Function test
   */
  it('contactsApi_query_key_test_2300', 0, async function (done) {
    let idtest = gRawContactId;
    let holder = { bundleName: 'com.ohos.contacts', displayName: 'phone', holderId: 1 };
    try {
      let resultSet = await contactsapi.queryKey(idtest, holder);
      console.info('contactsApi_query_key_test_2300 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet.length !== 0).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_key_test_2300 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_key_test_2400
   * @tc.name    Query key information
   * @tc.desc    Function test
   */
  it('contactsApi_query_key_test_2400', 0, async function (done) {
    let idtest = gRawContactId;
    console.info('contactsApi_query_key_test_2400 : query gRawContactId = ' + idtest);
    try {
      let resultSet = await contactsapi.queryKey(idtest);
      console.info('contactsApi_query_key_test_2400 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet.length !== 0).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_key_test_2400 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_query_mycard_test_2500
   * @tc.name    Query mycard information
   * @tc.desc    Function test
   */
  it('contactsApi_query_mycard_test_2500', 0, async function (done) {
    let holder = { bundleName: 'com.ohos.contacts', displayName: 'phone', holderId: 1 };
    try {
      let resultSet = await contactsapi.queryMyCard(holder);
      console.info('contactsApi_query_mycard_test_2500 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet.length === 0).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_query_mycard_test_2500 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_isMyCard_test_2600
   * @tc.name    Query mycard exist
   * @tc.desc    Function test
   */
  it('contactsApi_isMyCard_test_2600', 0, async function (done) {
    let id = 1;
    try {
      let isExist = await contactsapi.isMyCard(id);
      console.info('contactsApi_isMyCard_test_2600 : query isExist = ' + isExist);
      expect(isExist === 0).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_isMyCard_test_2600 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  contactsApi_isLocalContact_test_2700
   * @tc.name    Query isLocalContact exist
   * @tc.desc    Function test
   */
  it('contactsApi_isLocalContact_test_2700', 0, async function (done) {
    let id = gRawContactId;
    try {
      let isExist = await contactsapi.isLocalContact(id);
      console.info('logMessage contactsApi_isLocalContact_test_2700 isExist = ' + isExist);
      expect(isExist === 1).assertTrue();
      done();
    } catch (error) {
      console.info('contactsApi_isLocalContact_test_2700 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  abnormal_contactsApi_insert_test_2800
   * @tc.name    contactsApi_insert error
   * @tc.desc    Function test
   */
  it('abnormal_contactsApi_insert_test_2800', 0, async function (done) {
    let contactDataError = {};
    try {
      let rawContactId = await contactsapi.addContact(contactDataError);
      console.info('abnormal_contactsApi_insert_test_2800 : rawContactId = ' + rawContactId);
      expect(rawContactId === -1).assertTrue();
      done();
    } catch (error) {
      console.info('abnormal_contactsApi_insert_test_2800 : raw_contact insert error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  abnormal_contactsApi_update_test_3000
   * @tc.name    contactsApi_update error
   * @tc.desc    Function test
   */
  it('abnormal_contactsApi_update_test_3000', 0, async function (done) {
    let rawContactId = -1;
    let updateValues = { id: rawContactId, name: { fullName: '小红' } };
    let condition = { attributes: [ATTRIBUTE_SIX] };
    try {
      let updateCode = await contactsapi.updateContact(updateValues, condition);
      console.info('abnormal_contactsApi_update_test_3000 : updateCode = ' + updateCode);
      expect(updateCode === -1).assertTrue();
      done();
    } catch (error) {
      console.info('abnormal_contactsApi_update_test_3000 : update error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  abnormal_contactsApi_query_contact_test_3100
   * @tc.name    contactsApi_query_contact error
   * @tc.desc    Function test
   */
  it('abnormal_contactsApi_query_contact_test_3100', 0, async function (done) {
    let queryId = '-1';
    try {
      let resultSet = await contactsapi.queryContact(queryId);
      if (resultSet === null) {
        console.info('abnormal_contactsApi_query_contact_test_3100 is null');
      }
      if (resultSet === undefined) {
        console.info('abnormal_contactsApi_query_contact_test_3100 is undefined');
      }
      console.info('abnormal_contactsApi_query_contact_test_3100 : updateCode = ' + JSON.stringify(resultSet));
      expect(resultSet === undefined).assertTrue();
      done();
    } catch (error) {
      console.info('abnormal_contactsApi_query_contact_test_3100 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  abnormal_contactsApi_query_contacts_test_3200
   * @tc.name    contactsApi_query_contacts error
   * @tc.desc    Function test
   */
  it('abnormal_contactsApi_query_contacts_test_3200', 0, async function (done) {
    let ContactAttributes = { attributes: [ONE_HUNDERD] };
    try {
      let resultSet = await contactsapi.queryContacts(ContactAttributes);
      if (resultSet === null) {
        console.info('abnormal_contactsApi_query_contacts_test_3200 is null');
      }
      if (resultSet === undefined) {
        console.info('abnormal_contactsApi_query_contacts_test_3200 is undefined');
      }
      console.info('abnormal_contactsApi_query_contacts_test_3200 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet.length === 0).assertTrue();
      done();
    } catch (error) {
      console.info('abnormal_contactsApi_query_contacts_test_3200 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  abnormal_contactsApi_query_email_test_3300
   * @tc.name    contactsApi_query_email error
   * @tc.desc    Function test
   */
  it('abnormal_contactsApi_query_email_test_3300', 0, async function (done) {
    let email = 'email2222';
    try {
      let resultSet = await contactsapi.queryContactsByEmail(email);
      console.info('abnormal_contactsApi_query_email_test_3300 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet.length === 0).assertTrue();
      done();
    } catch (error) {
      console.info('abnormal_contactsApi_query_email_test_3300 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  abnormal_contactsApi_query_phoneNumber_test_3400
   * @tc.name    contactsApi_query_phoneNumber error
   * @tc.desc    Function test
   */
  it('abnormal_contactsApi_query_phoneNumber_test_3400', 0, async function (done) {
    let phoneNumber = '19999999';
    try {
      let resultSet = await contactsapi.queryContactsByPhoneNumber(phoneNumber);
      console.info('abnormal_contactsApi_query_phoneNumber_test_3400 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet.length === 0).assertTrue();
      done();
    } catch (error) {
      console.info('abnormal_contactsApi_query_phoneNumber_test_3400 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  abnormal_contactsApi_query_group_test_3500
   * @tc.name    contactsApi_query_group error
   * @tc.desc    Function test
   */
  it('abnormal_contactsApi_query_group_test_3500', 0, async function (done) {
    let holder = { bundleName: 'com.ohos.contacts2', displayName: 'phone2', holderId: 2 };
    try {
      let resultSet = await contactsapi.queryGroups(holder);
      console.info('abnormal_contactsApi_query_group_test_3500 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet.length === 0).assertTrue();
      done();
    } catch (error) {
      console.info('abnormal_contactsApi_query_group_test_3500 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  abnormal_contactsApi_query_key_test_3600
   * @tc.name    contactsApi_query_key error
   * @tc.desc    Function test
   */
  it('abnormal_contactsApi_query_key_test_3600', 0, async function (done) {
    let idtest = -1;
    try {
      let resultSet = await contactsapi.queryKey(idtest);
      console.info('abnormal_contactsApi_query_key_test_3600 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet.length === 0).assertTrue();
      done();
    } catch (error) {
      console.info('abnormal_contactsApi_query_key_test_3600 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  abnormal_contactsApi_query_mycard_test_3700
   * @tc.name    contactsApi_query_mycard error
   * @tc.desc    Function test
   */
  it('abnormal_contactsApi_query_mycard_test_3700', 0, async function (done) {
    let ContactAttributes = { attributes: [ONE_HUNDERD] };
    try {
      let resultSet = await contactsapi.queryMyCard(ContactAttributes);
      console.info('abnormal_contactsApi_query_mycard_test_3700 : query resultSet = ' + JSON.stringify(resultSet));
      expect(resultSet.length === 0).assertTrue();
      done();
    } catch (error) {
      console.info('abnormal_contactsApi_query_mycard_test_3700 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  abnormal_contactsApi_isMyCard_test_3800
   * @tc.name    isMyCard is not exist
   * @tc.desc    Function test
   */
  it('abnormal_contactsApi_isMyCard_test_3800', 0, async function (done) {
    let id = 999;
    try {
      let isExist = await contactsapi.isMyCard(id);
      console.info('abnormal_contactsApi_isMyCard_test_3800 : query isExist = ' + isExist);
      expect(isExist === 0).assertTrue();
      done();
    } catch (error) {
      console.info('abnormal_contactsApi_isMyCard_test_3800 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });

  /**
   * @tc.number  abnormal_contactsApi_isLocalContact_test_3900
   * @tc.name    contactsApi_isLocalContact is not exist
   * @tc.desc    Function test
   */
  it('abnormal_contactsApi_isLocalContact_test_3900', 0, async function (done) {
    let id = 999;
    try {
      let isExist = await contactsapi.isLocalContact(id);
      console.info('abnormal_contactsApi_isLocalContact_test_3900 : query isExist = ' + isExist);
      expect(isExist === 0).assertTrue();
      done();
    } catch (error) {
      console.info('abnormal_contactsApi_isLocalContact_test_3900 query error = ' + error);
      done();
    }
    sleep(SLEEP_TIME);
  });
});
