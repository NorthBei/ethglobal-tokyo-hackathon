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

// ameId=0&prizeType=0&prizeOwner=0x888889A700760c85244E945F09ae7ea185155d07&expireTime=123456789&signature=0xe12d8b7eb3285ffb4019fddcb8662cf472db69d46de56e94b2802166668274ef717bdbd37119f0f3cf339b67dff2bca24d9479260db26a59d7bc35bf999af5191c

function Redeem() {
  const router = useRouter();
  const { gameId, prizeType, prizeOwner, expireTime, signature } = router.query;

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
  }, [userNonce.data]);

  const { config, error } = usePrepareContractWrite({
    address: ichiban.address,
    abi: ichiban.abi,
    functionName: 'claimPhysicalPrize',
    args: [gameId, prizeType, prizeOwner, nonce, expireTime, signature],
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
