import unittest
import viewer_response


class Test(unittest.TestCase):

    def test(self):
        event = {
          "Records": [
            {
              "cf": {
                "config": {
                  "distributionId": "EDFDVBD6EXAMPLE"
                },
                "response": {
                  "clientIp": "2001:0db8:85a3:0:0:8a2e:0370:7334",
                  "method": "GET",
                  "uri": "/picture.jpg",
                  "headers": {
                    "host": [
                      {
                        "key": "Host",
                        "value": "d111111abcdef8.cloudfront.net"
                      }
                    ],
                    "user-agent": [
                      {
                        "key": "User-Agent",
                        "value": "curl/7.51.0"
                      }
                    ],
                    "x-amz-meta-header-x-robots-tag": [
                      {
                        "key": "x-amz-meta-header-x-robots-tag",
                        "value": "noindex"
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
        response = viewer_response.handler(event, {})
        target_header = response['headers']['x-robots-tag'][0]
        self.assertDictEqual(target_header, {
          "key": "X-Robots-Tag",
          "value": "noindex"
        })


if __name__ == '__main__':
    unittest.main()
