/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import {
  useCurrentStore,
  useCurrentUser,
} from 'src/context';
import { IChildrenReactNode } from 'src/models';

import { BacaCommon } from './BacaCommonProvider';
import { BacaOrder } from './BacaOrderProvider';

const BacaInitLoader = ({ children }: IChildrenReactNode) => {
    const { storage } = useCurrentStore();
    const { auth } = useCurrentUser();

    useEffect(() => {
        storage
            .load({
                key: 'authResponse',
                autoSync: true,
                syncInBackground: true,
            })
            .then(ret => {
                // found data go to then()
                auth(ret);
            })
            .catch(err => {
                // any exception including data not found
                // goes to catch()
                console.warn(err.message);
                switch (err.name) {
                    case 'NotFoundError':
                        // TODO;
                        break;
                    case 'ExpiredError':
                        // TODO
                        break;
                }
            });
    }, [storage]);

    return (
        <BacaCommon>
            <BacaOrder>
                {children}
            </BacaOrder>
        </BacaCommon>
    );
};

export { BacaInitLoader };
