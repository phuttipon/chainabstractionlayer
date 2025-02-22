// seed phrase: crouch great grape leg maze swap urban motor have poet saddle pave

module.exports = {
  'eth_accounts': [
    {
      params: [],
      result: [
        '0x322d4959c911520645c0638204b42ce0689236e9',
        '0x635d7d148054b9471d79084b80b864a166956139',
        '0xa17fe13ab28477f17fc7f1ec99a4385c95a5356b',
        '0xd09f520de3fc24ee94fc4fb19f062c4d0cdec6c0',
        '0xfc0853855e11ccb2120434ed97e76f44b55b869e',
        '0xa1bc9766cf6b9f3d7d072430a9de2bdfa94af20b',
        '0x786a4faf6ccd016131c66b1cc74dfb8f5f71fa71',
        '0x99a2d52e6626998218801a0cf6ddbdf63b6865cd',
        '0x47125b17d8f12188d40797631413f9b58fbada80',
        '0xfd5becf2adec096ef511dbab5a48807ae5854116'
      ]
    }
  ],
  'eth_gasPrice': [
    {
      params: [],
      result: '0x2540be400'
    }
  ],
  'eth_estimateGas': [
    {
      params: [{
        from: '0x322d4959c911520645c0638204b42ce0689236e9',
        to: '0x635d7d148054b9471d79084b80b864a166956139',
        value: '0x3e8'
      }],
      result: '0x5208'
    },
    {
      params: [{
        from: '0x322d4959c911520645c0638204b42ce0689236e9',
        to: '0x635d7d148054b9471d79084b80b864a166956139',
        value: '0x3e8',
        data: '0x1234'
      }],
      result: '0x9c40'
    },
    {
      params: [{
        from: '0x635d7d148054b9471d79084b80b864a166956139',
        to: '0x635d7d148054b9471d79084b80b864a166956139',
        value: '0x1111',
        data: '0x5555'
      }],
      result: '0x5228'
    },
    {
      params: [{
        from: '0x635d7d148054b9471d79084b80b864a166956139',
        to: '0x635d7d148054b9471d79084b80b864a166956139',
        value: '0x1111'
      }],
      result: '0x5208'
    }
  ],
  'eth_sendTransaction': [
    {
      params: [{
        from: '0x322d4959c911520645c0638204b42ce0689236e9',
        to: '0x635d7d148054b9471d79084b80b864a166956139',
        value: '0x3e8',
        gas: '0x5208'
      }],
      result: '7968d7929845cf0b32e8c8e65f363ba764420bcfe70e4eeef63312e42218d6b2'
    },
    {
      params: [{
        from: '0x322d4959c911520645c0638204b42ce0689236e9',
        to: '0x635d7d148054b9471d79084b80b864a166956139',
        value: '0x3e8',
        data: '0x1234',
        gas: '0xea60'
      }],
      result: '0xf5acc7ff066f33c9b6fb53105d24bb0e89940afaf1bddf47632d79cef2da617a'
    }
  ],
  'eth_getBlockByNumber': [
    {
      params: [ '0x1', true ],
      result: {
        number: '0x1',
        hash: '0x868b4c97d842aa758dfc97834088aee0687410365140adc4bebbc4c02b0eddc3',
        parentHash: '0xf119e45bfae9893ce759772e11a427d67427ceacf2bc04d11d406e4d7ad511da',
        mixHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0x0000000000000000',
        sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
        logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        transactionsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
        stateRoot: '0xf9220de8a2b967110e042de4097ffb126ba09e7acc614c0f8cb963531ae301d7',
        receiptsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
        miner: '0x0000000000000000000000000000000000000000',
        difficulty: '0x0',
        totalDifficulty: '0x0',
        extraData: '0x',
        size: '0x03e8',
        gas: '0x6691b7',
        gasUsed: '0x5208',
        timestamp: '0x5c3f0135',
        transactions: [
          {
            hash: '0xca218db60aaad1a3e4d7ea815750e8bf44a89d967266c3662746f796800412cd',
            nonce: '0x0',
            blockHash: '0x868b4c97d842aa758dfc97834088aee0687410365140adc4bebbc4c02b0eddc3',
            blockNumber: '0x01',
            transactionIndex: '0x00',
            from: '0x322d4959c911520645c0638204b42ce0689236e9',
            to: '0x635d7d148054b9471d79084b80b864a166956139',
            value: '0x2710',
            gas: '0x015f90',
            gasPrice: '0x04a817c800',
            input: '0x0'
          }
        ],
        uncles: []
      }
    }
  ],
  'eth_blockNumber': [
    {
      params: [],
      result: '0x0b'
    }
  ],
  'eth_getTransactionByHash': [
    {
      params: ['0xca218db60aaad1a3e4d7ea815750e8bf44a89d967266c3662746f796800412cd'],
      result: {
        hash: '0xca218db60aaad1a3e4d7ea815750e8bf44a89d967266c3662746f796800412cd',
        nonce: '0x0',
        blockHash: '0x868b4c97d842aa758dfc97834088aee0687410365140adc4bebbc4c02b0eddc3',
        blockNumber: '0x01',
        transactionIndex: '0x00',
        from: '0x322d4959c911520645c0638204b42ce0689236e9',
        to: '0x635d7d148054b9471d79084b80b864a166956139',
        value: '0x2710',
        gas: '0x015f90',
        gasPrice: '0x04a817c800',
        input: '0x0'
      }
    }
  ],
  'eth_getBalance': [
    {
      params: ['0x322d4959c911520645c0638204b42ce0689236e9', 'latest'],
      result: '0x56bb6f44fd0319250'
    }
  ],
  'eth_getTransactionCount': [
    {
      params: ['0x322d4959c911520645c0638204b42ce0689236e9', 'latest'],
      result: '0xb'
    }
  ],
  'eth_getTransactionReceipt': [
    {
      params: ['0x836a5e038d599454d576493f55c8000d4cce30460437b9e23718154e8f0e4298'],
      result: {
        transactionHash: '836a5e038d599454d576493f55c8000d4cce30460437b9e23718154e8f0e4298',
        transactionIndex: '0',
        blockHash: 'bd920a2956a550501eb71e5eb634dc0219eb0830580c45136160b917c948f981',
        blockNumber: 9,
        gasUsed: '5208',
        cumulativeGasUsed: '5208',
        contractAddress: null,
        logs: [],
        status: '1',
        logsBloom: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
      }
    }
  ],
  'eth_sign': [
    {
      params: ['0x322d4959c911520645c0638204b42ce0689236e9', '0x6c697175616c697479'],
      result: '0x0f1f169ed203e0a8e053e060e0ba1a7da87cc37f4aa84c9329ba2a63974d0f5b5414b024d80e805418a6f315fd8185e74daaca63fc871c5568e9b18d2f899e4701'
    }
  ]
}
