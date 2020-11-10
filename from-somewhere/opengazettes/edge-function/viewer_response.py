'''This serves as an Amazon Cloudfront Lambda@Edge viewer response function

Each S3 object metadata key starting with "x-amz-meta-header-" is process

E.g. metadata key-value pair `x-amz-meta-header-some-x-robots-tag=noindex`
is returned as response header `X-Robots-Tag=noindex`
'''


def handler(event, context):
    '''Replace metadata headers'''
    response = event["Records"][0]["cf"]["response"]
    headers = response["headers"]
    prefix = 'x-amz-meta-header-'
    for header in list(headers):
        if header.lower().startswith(prefix):
            new_header = header.replace(prefix, '')
            headers[new_header.lower()] = [
                {
                    'key': new_header.title(),
                    'value': headers[header][0]['value']
                }
            ]
            del headers[header]
    return response
