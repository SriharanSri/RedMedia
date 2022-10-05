import React from "react";
import "./style.scss";

const FaqComponent = () => {
  return (
    <div className="text-white pt-12 pb-6 px-5 faq">
      <section>
        <h2 className="fs-1 fw-bold">Section 1 - Basics of NFT</h2>
        <ol>
          <li className="list-bold">
            <h4 className="fw-bold">What is an NFT?</h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  A Non Fungible token or NFT, that as it is commonly
                  abbreviated, is either a digital representation of asset or a
                  digital object that exists on a decentralized ledger. A
                  Non-fungible token, as the name implies, is indivisible and
                  unique. An NFT has a variety of applications including but not
                  limited to provenance, record-keeping, elimination of
                  intermediaries for artists, and a lot more! They can also
                  serve as proof of authenticity for collectibles like original
                  audio, video and digital images.
                </p>
              </li>
            </ul>
          </li>
          <li className="list-bold">
            <h4 className="fw-bold">
              How is it any different from a normal art or image that I have?
            </h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  The art that you have might not have inherent proof that it
                  was created by the author except for the verbal claim. There
                  are chances that the records might be lost in transit from one
                  collector to another. However, with blockchain technology that
                  powers the NFT, it is possible to prove the authenticity and
                  also keep a record of the previous collectors.
                </p>
              </li>
            </ul>
          </li>
          <li className="list-bold">
            <h4 className="fw-bold">
              Why can't I just download or screenshot the image?
            </h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  You can surely download or screenshot but it will be just the
                  'image' without the attributes and the properties that make
                  the object unique, all of which is stored on the blockchain.
                  While you may possess the 'image', it might not carry the
                  properties and attributes that make it valuable, which means
                  it is yet another image that does not carry value in secondary
                  markets.
                </p>
              </li>
            </ul>
          </li>
          <li className="list-bold">
            <h4 className="fw-bold">
              How do I prove that I have the original image or audio or video?
            </h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  There is no separate effort required from your side to prove
                  its originality. This task of establishing authenticity is
                  adequately taken care of by the technology that powers NFT. In
                  fact, this hassle-free process of proving makes the NFTs an
                  ideal digital collectible investment.
                </p>
              </li>
            </ul>
          </li>
          <li className="list-bold">
            <h4 className="fw-bold">Why should I even invest in NFTs?</h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  NFTs represent collectibles in the digital space. In the year
                  2021, NFT and its revenue spiked up to $17.7 Billion, from $
                  82.5 million in 2020. Investing in collectibles with provable
                  lineage and value is never a bad idea. It is to be noted that
                  collectibles might be subjective in their value. Some NFT
                  collectibles have grown by over 100x of their original value
                  over a period of just days.
                </p>
              </li>
            </ul>
          </li>
          <li className="list-bold">
            <h4 className="fw-bold">
              What determines the value of an NFT art, music or video?
            </h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  The value of any NFT, as much as it is for any collectible, is
                  subjective and it might not be possible to fit it into an
                  equation. However, the rarity of the NFT being a primary
                  factor in determining the value, the person/brand launching
                  it, the asset/collectible it represents, the purpose of the
                  NFT collection, and the profile of people owning other similar
                  NFTs are known to increase the value.
                </p>
              </li>
            </ul>
          </li>
          <li className="list-bold">
            <h4 className="fw-bold">How do I purchase an NFT?</h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  Now you can buy NFT with the fiat currency - INR. An NFT can
                  simply be purchased through Credit or Debit cards and paid out
                  in INR. This is for primary sales only. During the period of
                  secondary sales, you can procure the same from sellers on
                  opensea.
                </p>
              </li>
            </ul>
          </li>
          <li className="list-bold">
            <h4 className="fw-bold">Are NFTs considered as assets?</h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  Non-fungible tokens can be considered as digital assets that
                  have hardwired lineage on the blockchain. They can be traded
                  on secondary marketplaces or passed on to anyone you wish to,
                  with full provenance like any original artwork in the real
                  world that retains its value forever.
                </p>
              </li>
            </ul>
          </li>
          <li className="list-bold">
            <h4 className="fw-bold">
              How will the authenticity of my NFT be determined and provable
              after I buy it?
            </h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  Since the NFT is built on the Blockchain, all the attributes
                  and properties associated with the NFT are carried forward.
                  The inherent properties of the NFT Blockchain will take care
                  to establish authenticity. In fact, the simplicity of
                  provenance makes the NFTs a preferred digital collectible. We
                  encourage you to read the Terms and Conditions for further
                  details.
                </p>
              </li>
            </ul>
          </li>
          <li className="list-bold">
            <h4 className="fw-bold">
              Does owning an NFT mean that I hold copyrights over the content?
            </h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  Buying this NFT entitles you to certain rights and also
                  restricts you from using the NFT in certain ways. We encourage
                  you to read the terms and conditions to understand the
                  details.
                </p>
              </li>
            </ul>
          </li>
        </ol>
      </section>
      <section>
        <h2 className="fs-1 fw-bold">Section 2 - About cadburygems.in</h2>
        <ol>
          <li className="list-bold">
            <h4 className="fw-bold">How do I sign up?</h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  You can login by entering your PII such as name, email
                  address, phone number or you can also sign up through facebook
                  or google
                </p>
              </li>
            </ul>
          </li>

          <li className="list-bold">
            <h4 className="fw-bold">How do I login?</h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  You can use your given mobile/email address as the username
                  and set password to login. You can also login through facebook
                  and google
                </p>
              </li>
            </ul>
          </li>

          <li className="list-bold">
            <h4 className="fw-bold">How do I upload artwork?</h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  After your login, you can click on the "UPLOAD ARTWORK" button
                  and enter the details such as name of the child artist, age of
                  the child artist, name of the art and finally upload the
                  artwork in .png, .jpeg, or .gif format. You can only upload
                  one file at a time of a maximum size of 30MB.
                </p>
              </li>
            </ul>
          </li>

          <li className="list-bold">
            <h4 className="fw-bold">Can I upload multiple artwork?</h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  Yes, this is possible. You can simply repeat the process of
                  uploading your artwork for each of the artwork you wish to
                  upload. Note, you can only upload one artwork at a time but by
                  repeating the process, you can upload multiple artworks.
                </p>
              </li>
            </ul>
          </li>

          <li className="list-bold">
            <h4 className="fw-bold">Where can I view my uploaded artwork?</h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  You can go to your profile page after logging in and you will
                  be able to see, under the "Uploaded art" section, all the past
                  uploads of yours.
                </p>
              </li>
            </ul>
          </li>

          <li className="list-bold">
            <h4 className="fw-bold">
              Can I delete/remove a particular uploaded artwork?
            </h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  You can reach out to our support team for the same. You can
                  find the same on the footer of the website.
                </p>
              </li>
            </ul>
          </li>

          <li className="list-bold">
            <h4 className="fw-bold">
              How do I become eligible to purchase the NFT?{" "}
            </h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  All you need to do is create your account on cadburygems.in
                  and wait for NFT Drop. It is to be noted that, you will need
                  to agree to our terms and conditions to be eligible to
                  purchase the NFT.
                </p>
              </li>
            </ul>
          </li>
        </ol>
      </section>
      <section>
        <h2 className="fs-1 fw-bold">Section 3 - About GuardianLink</h2>
        <ol>
          <li className="list-bold">
            <h4 className="fw-bold">What is GuardianLink? </h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  GuardianLink, is Asia's fastest growing NFT Marketplace and
                  Ecosystem with a built-in Legitimacy Protocol. GuardianLink is
                  a one-of-a-kind NFT platform that enables creators, brands and
                  celebrities worldwide, to curate their NFTs in their own
                  launchpads. GuardianLink owns and runs India's largest NFT
                  Marketplace jump.trade, all its functionalities and attributes
                  along with many other NFT Launchpads and Marketplaces.
                </p>
              </li>
            </ul>
          </li>

          <li className="list-bold">
            <h4 className="fw-bold">
              What blockchain are you using to power your NFT?{" "}
            </h4>
            <ul type="a" className="answers-list">
              <li className="answers">
                <p>
                  Our launchpad is powered by the Polygon Blockchain. Polygon
                  has been preferred in terms of its scalability across the
                  globe and because it has low gas fees. We do not, however,
                  guarantee that the claims we have made will be held true in
                  the future as it is completely not in our control.
                </p>
              </li>
            </ul>
          </li>
        </ol>
      </section>
      <section>
        <h2 className="fs-1 fw-bold">Section 4 - About Save The Children</h2>
        <ul className="answers-list">
          <li>
            <p>
              Save the Children is India's leading independent child rights'
              NGO. This organization has been working to improve the lives of
              marginalized children in India since 2008. Headquartered in
              Gurugram, and registered as Bal Raksha Bharat in India, the
              organization is a member of the international Save the Children
              Alliance
            </p>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="fs-1 fw-bold">
          Section 5 - About Mondelēz and Cadbury Gems
        </h2>
        <ol>
          <li className="list-bold">
            <h4 className="fw-bold">Mondelēz:</h4>
            <ul className="answers-list">
              <li className="answers">
                <p>
                  For over seven decades now, Mondelēz has been making delicious
                  products that "wow" its consumers. It is a "70 years" young
                  company with a powerful purpose - Empower People to Snack
                  Right.
                </p>
              </li>
            </ul>
          </li>

          <li className="list-bold">
            <h4 className="fw-bold">Cadbury Gems:</h4>
            <ul className="answers-list">
              <li className="answers">
                <p>
                  Cadbury Gems launched in 1969, came in a unique format of
                  multiple, colorful, chocolate buttons. It has now become a
                  part of every Indian child's growing up years
                </p>
              </li>
            </ul>
          </li>
        </ol>
      </section>
      <section>
        <h2 className="fs-1 fw-bold">Section 6 - About The Campaign</h2>
        <ul className="answers-list">
          <li>
            <p>
              Cadbury Gems Junior NFT is the latest campaign that encompasses
              everything Cadbury Gems stands for - Encouraging the
              ingenuity/imagination of children, Masti and Colours. All of this
              with a modern and relevant to tech-driven times touch that makes
              the 'idea' stand above the usual children's brand campaigns.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default FaqComponent;
