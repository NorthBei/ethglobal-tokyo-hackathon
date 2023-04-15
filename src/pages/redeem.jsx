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
  //   const { gameId, prizeType, prizeOwner, expireTime, signature } = router.query;

  const userNonce = useContractRead({
    address: ichiban.address,
    abi: ichiban.abi,
    functionName: 'getUsedNonces',
    args: [
      // player
      //   prizeOwner,
      '0xcf3046BE94359D67B89e39812689e6Ab91cf9F28',
    ],
  });

  const nonce = useMemo(() => {
    if (!userNonce.data) {
      return null;
    }
    return userNonce.data + 1;
  }, [userNonce]);

  const { config } = usePrepareContractWrite({
    address: ichiban.address,
    abi: ichiban.abi,
    functionName: 'claimPhysicalPrize',
    // args: [gameId, prizeType, prizeOwner, nonce, expireTime, signature],
    args: [
      0,
      3,
      '0xcf3046BE94359D67B89e39812689e6Ab91cf9F28',
      nonce,
      123456789,
      '0xdc34243896ebae65db67523a9577ffc4f80f0486781c4f6b36d3c5e710b66221700f7e2fec67bd52fa385313b5d670105e6c08d0f9ece5f92269ebdf9cd801061c',
    ],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log(data, isLoading, isSuccess);

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
        <Button type="primary" shape="round" onClick={redeem} disabled={!write}>
          Redeem
        </Button>
      </Row>
    </section>
  );
}

export default Redeem;
