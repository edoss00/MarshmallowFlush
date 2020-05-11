#!/usr/bin/python3
import sys
sys.path.insert(0,"/var/www/virograph/")
sys.path.insert(0,"/var/www/virograph/virograph/")

import logging
logging.basicConfig(stream=sys.stderr)

from virograph import app as application
