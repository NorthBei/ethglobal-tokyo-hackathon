import { Button, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import ichiban from '../contracts/ichiban';

const { Text } = Typography;

function Redeem() {
  const router = useRouter();
  const { gameId, prizeType, prizeOwner, expireTime, signature } = router.query;

  //   free.app/redeem?gameId=0&prizeType=3&prizeOwner=0xcf3046BE94359D67B89e39812689e6Ab91cf9F28&expireTime=123456789&signature=0x46a7f0f206d6a065f16ce2e0cf07aa06a59bc6d6f39a9333c0ccd8b4f038ae24796ec411ed0892745eff6ccbb29e4668b2440d8353229722b5bc74ee08c1c2181b

  const userNonce = useContractRead({
    address: ichiban.address,
    abi: ichiban.abi,
    functionName: 'getUsedNonces',
    args: [prizeOwner],
  });

  const nonce = useMemo(() => {
    if (!userNonce.data) {
      return null;
    }
    return userNonce.data + 1;
  }, [userNonce]);

  const { config, error } = usePrepareContractWrite({
    address: ichiban.address,
    abi: ichiban.abi,
    functionName: 'claimPhysicalPrize',
    args: [gameId, prizeType, prizeOwner, nonce, expireTime, signature],
    // args: [
    //   0,
    //   3,
    //   '0xcf3046BE94359D67B89e39812689e6Ab91cf9F28',
    //   nonce,
    //   123456789,
    //   '0x46a7f0f206d6a065f16ce2e0cf07aa06a59bc6d6f39a9333c0ccd8b4f038ae24796ec411ed0892745eff6ccbb29e4668b2440d8353229722b5bc74ee08c1c2181b',
    // ],
  });
  console.log(error);
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log(data, isLoading, isSuccess, write);

  useEffect(() => {
    if (!isSuccess) return;
    alert('Success');
  }, [isSuccess]);

  const redeem = () => {
    if (!nonce) return;
    if (isLoading) return;
    write();
  };

  return (
    <section style={{ position: 'relative', width: '100%' }}>
      <Row style={{ paddingTop: '200px' }} justify="center">
        <Text>Please redeem the prizes.</Text>
      </Row>
      <Row style={{ paddingTop: '15px' }} justify="center">
        <Button
          type="primary"
          shape="round"
          onClick={redeem}
          disabled={!write || isSuccess}
        >
          Redeem
        </Button>
      </Row>
    </section>
  );
}

export default Redeem;
