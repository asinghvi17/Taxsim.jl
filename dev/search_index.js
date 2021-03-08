var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = Taxsim","category":"page"},{"location":"#Taxsim","page":"Home","title":"Taxsim","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [Taxsim]","category":"page"},{"location":"#Taxsim.taxsim32-Tuple{Any}","page":"Home","title":"Taxsim.taxsim32","text":"Before using taxsim32, please make yourself familiar with Internet TAXSIM 32. Submit a few individual observations and upload an entire csv file.\n\nSyntax\n\ntaxsim32(df; kwargs...)\n\ndf has to be a DataFrame object with at least one observation.\nIncluded columns have to be named exactly as in the Internet TAXSIM 32 variable list (bold names after boxes) but can be in any order. taxsim32 returns typos and case errors.\nNon-provided input variables are set to zero by the TAXSIM server but \" \" (blanks as strings) or missing lead to non-response as the server only accepts Integers or Floats. taxsim32 returns type errors.\n\nKeyword Arguments\n\nconnection: choose either \"SSH\" or \"FTP\". \"SSH\" issues a system curl command while \"FTP\" uses the FTPClient Package. Defaults to \"SSH\" (which is faster).\nfull: request the full list of TAXSIM return variables v1 to v45. Defaults to false which returns v1 to v9.\nlong_names: name all return variables with their long TAXSIM names (as opposed to abbreviated names for v1 to v9 and no names for v10 to v45). Defaults to false.\n\nOutput\n\nData frame with requested TAXSIM return variables. Column types are either Integer or Float.\nIf df does not include state or if state = 0, the data frame returned by a full request does not include v30 to v41.\nObservations are ordered as in df so hcat(df, df_output, makeunique=true) merges all variables of the input and output data frames.\n\nExamples\n\nusing DataFrames, Taxsim\n\ndf_small_input = DataFrame(year=1980, mstat=2, ltcg=100000)\n1×3 DataFrame\n│ Row │ year  │ mstat │ ltcg   │\n│     │ Int64 │ Int64 │ Int64  │\n├─────┼───────┼───────┼────────┤\n│ 1   │ 1980  │ 2     │ 100000 │\n\ndf_small_output_default = taxsim32(df_small_input)\n1×9 DataFrame\n│ Row │ taxsimid │ year  │ state │ fiitax  │ siitax  │ fica    │ frate   │ srate   │ ficar   │\n│     │ Float64  │ Int64 │ Int64 │ Float64 │ Float64 │ Float64 │ Float64 │ Float64 │ Float64 │\n├─────┼──────────┼───────┼───────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤\n│ 1   │ 0.0      │ 1980  │ 0     │ 10920.0 │ 0.0     │ 0.0     │ 20.0    │ 0.0     │ 12.0    │\n\ndf_small_output_full = taxsim32(df_small_input, connection=\"FTP\", full=true)\n1×29 DataFrame\n│ Row │ taxsimid │ year  │ state │ fiitax  │ siitax  │ fica    │ frate   │ srate   │ ficar   │ v10     │ v11     │ ... | v29     │ v42     │ ... | v45     │\n│     │ Float64  │ Int64 │ Int64 │ Float64 │ Float64 │ Float64 │ Float64 │ Float64 │ Float64 │ Float64 │ Float64 │ ... │ Float64 │ Float64 | ... | Float64 |\n├─────┼──────────┼───────┼───────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────┼─────────┼─────────┼─────┼─────────┼\n│ 1   │ 0.0      │ 1980  │ 0     │ 10920.0 │ 0.0     │ 0.0     │ 20.0    │ 0.0     │ 12.26   │ 40000.0 │ 0.0     │ ... | 0.0     │ 0.0     | ... | 0.0     |\n\ndf_small_output_names = taxsim32(df_small_input, long_names=true)\n1×9 DataFrame\n│ Row │ Case ID │ Year  │ State │ Federal income tax liability including capital gains rates, surtaxes, AMT and refundable and non-refundable credits │ ... │ federal marginal rate │\n│     │ Float64 │ Int64 │ Int64 │ Float64                                                                                                             │ ... │ Float64               │\n├─────┼─────────┼───────┼───────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────┼─\n│ 1   │ 0.0     │ 1980  │ 0     │ 10920.0                                                                                                             │ ...  │ 20.0                 │\n\nN = 10000\ndf_small_stateN = DataFrame(year=repeat([1980],inner=N), mstat=repeat([2],inner=N), ltcg=repeat([100000],inner=N), state=repeat([1],inner=N))\ndf_small_stateN_out = taxsim32(df_small_stateN)\n10000×9 DataFrame\n   Row │ taxsimid  year   state  fiitax   siitax   fica     frate    srate    ficar\n       │ Float64   Int64  Int64  Float64  Float64  Float64  Float64  Float64  Float64\n───────┼──────────────────────────────────────────────────────────────────────────────\n     1 │      1.0   1980      1  10920.0   1119.0      0.0     20.0      4.0     12.0\n     2 │      2.0   1980      1  10920.0   1119.0      0.0     20.0      4.0     12.0\n     3 │      3.0   1980      1  10920.0   1119.0      0.0     20.0      4.0     12.0\n     4 │      4.0   1980      1  10920.0   1119.0      0.0     20.0      4.0     12.0\n   ⋮   │    ⋮        ⋮      ⋮       ⋮        ⋮        ⋮        ⋮        ⋮        ⋮\n  9998 │   9998.0   1980      1  10920.0   1119.0      0.0     20.0      4.0     12.0\n  9999 │   9999.0   1980      1  10920.0   1119.0      0.0     20.0      4.0     12.0\n 10000 │  10000.0   1980      1  10920.0   1119.0      0.0     20.0      4.0     12.0\n\n\n\n\n\n","category":"method"}]
}
