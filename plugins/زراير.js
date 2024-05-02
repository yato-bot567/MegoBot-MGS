let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.relayMessage(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: 'الازرار'
            },
            body: {
              text: 'تست'
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'single_select',
                  buttonParamsJson: JSON.stringify({
                    title: 'اضغط',
                    sections: [
                      {
                        title: 'القائمة',
                        highlight_label: 'تست',
                        rows: [
                          {
                            header: 'منشن',
                            title: 'منشن',
                            description: '',
                            id: '.منشن'
                          },
                                        {
                            header: 'المطور',
                            title: 'المطور',
                            description: '',
                            id: '.مطور'
                          },
                          {
                            header: 'اوامر',
                            title: 'اوامر',
                            description: '',
                            id: '.اوامر'
                          }
                        ]
                      }
                    ]
                  }),
                  messageParamsJson: ''
                }
              ]
            }
          }
        }
      }
    }, {})

}

handler.help = ['info']
handler.tags = ['main']
handler.command = ['الازرار']

export default handler
