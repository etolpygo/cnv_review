#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import division, print_function

import dxpy
import sys
import os

GO_SCRIPT_ROOT = os.path.dirname(os.path.abspath(__file__))

for directory in [  "/SR-238/Data/Intensities/BaseCalls/Alignment/", 
                    "/SR-250/Data/Intensities/BaseCalls/Alignment/",
                    "/SR-257/Data/Intensities/BaseCalls/Alignment/",
                    "/SR-260/Data/Intensities/BaseCalls/Alignment/"]:
    os.system("mkdir -p " + GO_SCRIPT_ROOT + directory)       

for file_id, out_path in [
    ("file-F1vB6fj05Z5zXp139VyGBJPp", GO_SCRIPT_ROOT + "/SR-238/Data/Intensities/BaseCalls/Alignment/CCGL-716.vcf"), # /010617-CL-221/out/vcfs_for_go/PA-760_CGP-3615_CGP-3614_NT.SR-238.final_snv_go.vcf
    ("file-F1v3pk00FBxpYkXk9VPby0Kz", GO_SCRIPT_ROOT + "/SR-238/Data/Intensities/BaseCalls/Alignment/CGP-3614.cns"), # /010617-CL-221/out/results/CGP-3614.cns
    ("file-F1v3jg0027pQKF5J61Jqgg5G", GO_SCRIPT_ROOT + "/SR-238/Data/Intensities/BaseCalls/Alignment/CGP-3615.cns"), # /010617-CL-221/out/results/CGP-3615.cns
    ("file-F1v3pjj0FBxv4VFX9VGxgg9q", GO_SCRIPT_ROOT + "/SR-238/Data/Intensities/BaseCalls/Alignment/CGP-3614.cnr"), # /010617-CL-221/out/results/CGP-3614.cnr
    ("file-F1v3jfj027pz7VzG60QYq468", GO_SCRIPT_ROOT + "/SR-238/Data/Intensities/BaseCalls/Alignment/CGP-3615.cnr"), # /010617-CL-221/out/results/CGP-3615.cnr
    ("file-F2P46V806157Vp35Py9k33g2", GO_SCRIPT_ROOT + "/SR-250/Data/Intensities/BaseCalls/Alignment/CCGL-773.vcf"), # /020317-CL-233/out/vcfs_for_go/PA-820_CGP-3828_T.SR-250.final_snv_go.vcf
    ("file-F2P1xV00Jzy5qy9Z0kk709pk", GO_SCRIPT_ROOT + "/SR-250/Data/Intensities/BaseCalls/Alignment/CGP-3828.cns"), # /020317-CL-233/out/results/CGP-3828.cns
    ("file-F2P1xQj0Jzy9fgyJ0kYzgb85", GO_SCRIPT_ROOT + "/SR-250/Data/Intensities/BaseCalls/Alignment/CGP-3828.cnr"), # /020317-CL-233/out/results/CGP-3828.cnr
    ("file-F2fYxxQ03vjPyYXv8yv83X54", GO_SCRIPT_ROOT + "/SR-257/Data/Intensities/BaseCalls/Alignment/CCGL-769.vcf"), # /021617-CL-239.1/out/vcfs_for_go/PA-797_CGP-3883_N.SR-257.final_snv_go.vcf
    ("file-F2fV8FQ0q19X2bxf2qJjGVbb", GO_SCRIPT_ROOT + "/SR-257/Data/Intensities/BaseCalls/Alignment/CGP-3883.cns"), # /021617-CL-239.1/out/results/CGP-3883.cns
    ("file-F2fV8F80q19xj24Q2pbQ1PxQ", GO_SCRIPT_ROOT + "/SR-257/Data/Intensities/BaseCalls/Alignment/CGP-3883.cnr"), # /021617-CL-239.1/out/results/CGP-3883.cnr
    ("file-F2j4BJ80vzJB9BYk4KX5pFq7", GO_SCRIPT_ROOT + "/SR-260/Data/Intensities/BaseCalls/Alignment/CCGL-769.vcf"), # /021717-CL-240/out/vcfs_for_go/PA-797_CGP-3883_CGP-3933_NT.SR-257,SR-260.final_snv_go.vcf
    ("file-F2j1Gb005p9jbx1126Kv9gKG", GO_SCRIPT_ROOT + "/SR-260/Data/Intensities/BaseCalls/Alignment/CGP-3933.cns"), # /021717-CL-240/out/results/CGP-3933.cns
    ("file-F2j1Kj803xY212JZ44f3g8j0", GO_SCRIPT_ROOT + "/SR-260/Data/Intensities/BaseCalls/Alignment/CGP-3883.cns"), # /021717-CL-240/out/results/CGP-3883.cns
    ("file-F2j1Gb005p9vFFPP2794xXYP", GO_SCRIPT_ROOT + "/SR-260/Data/Intensities/BaseCalls/Alignment/CGP-3933.cnr"), # /021717-CL-240/out/results/CGP-3933.cnr
    ("file-F2j1Kj003xYBzj7X446K3zFF", GO_SCRIPT_ROOT + "/SR-260/Data/Intensities/BaseCalls/Alignment/CGP-3883.cnr"), # /021717-CL-240/out/results/CGP-3883.cnr
    # Unsure:
    # ("file-F1v5jQ80JbQYfybX513B4q1K", "SR-238/Data/Intensities/BaseCalls/Alignment/CGP-3614.call.cns"), # /010617-CL-221/out/results/PA-760_CGP-3614_T.call.cns
    # ("file-F1v5jPQ0JbQZP14f50BZk6pP", "SR-238/Data/Intensities/BaseCalls/Alignment/CGP-3615.call.cns"), # /010617-CL-221/out/results/PA-760_CGP-3615_N.call.cns
    # ("file-F2P2YG80yZJFx77B0jjY6kKf", "SR-250/Data/Intensities/BaseCalls/Alignment/CGP-3828.call.cns"), # /020317-CL-233/out/results/PA-820_CGP-3828_T.call.cns
    # ("file-F2fXkG004BZ66FBZ8xkFkGZz", "SR-257/Data/Intensities/BaseCalls/Alignment/CGP-3883.call.cns"), # /021617-CL-239.1/out/results/PA-797_CGP-3883_N.call.cns
    # ("file-F2j3KZj0jq93FfyyK4XyV7Kk", "SR-260/Data/Intensities/BaseCalls/Alignment/CGP-3883.call.cns"), # /021717-CL-240/out/results/PA-797_CGP-3883_N.call.cns
    # ("file-F2j3KbQ0jq9G4jB4K54V5bVj", "SR-260/Data/Intensities/BaseCalls/Alignment/CGP-3933.call.cns"), # /021717-CL-240/out/results/PA-797_CGP-3933_T.call.cns
]:
    dxf = dxpy.DXFile(file_id)
    # print("Downloading", dxf.describe()['name'], "to:", out_path, file=sys.stderr)
    dxpy.download_dxfile(file_id, out_path)


# Files of interest:
# .
# ├── fetch_from_dx.sh
# ├── SR-238
# │   └── Data
# │       └── Intensities
# │           └── BaseCalls
# │               └── Alignment
# │                   ├── CCGL-716.vcf
# │                   ├── CGP-3614.call.cns
# │                   ├── CGP-3614.cnr
# │                   ├── CGP-3614.cns
# │                   ├── CGP-3615.call.cns
# │                   ├── CGP-3615.cnr
# │                   └── CGP-3615.cns
# ├── SR-250
# │   └── Data
# │       └── Intensities
# │           └── BaseCalls
# │               └── Alignment
# │                   ├── CCGL-773.vcf
# │                   ├── CGP-3828.call.cns
# │                   ├── CGP-3828.cnr
# │                   └── CGP-3828.cns
# ├── SR-257
# │   └── Data
# │       └── Intensities
# │           └── BaseCalls
# │               └── Alignment
# │                   ├── CCGL-769.vcf
# │                   ├── CGP-3883.call.cns
# │                   ├── CGP-3883.cnr
# │                   └── CGP-3883.cns
# └── SR-260
#     └── Data
#         └── Intensities
#             └── BaseCalls
#                 └── Alignment
#                     ├── CCGL-769.vcf
#                     ├── CGP-3883.call.cns
#                     ├── CGP-3883.cnr
#                     ├── CGP-3883.cns
#                     ├── CGP-3933.call.cns
#                     ├── CGP-3933.cnr
#                     └── CGP-3933.cns
